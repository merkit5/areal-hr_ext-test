<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { fetchAllChangeHistory } from "@/services/changeHistory.js";

const router = useRouter();
const changeHistory = ref([]);
const loading = ref(false);

const load = async () => {
  loading.value = true;
  try {
    const { data } = await fetchAllChangeHistory();
    changeHistory.value = data;
  } catch (error) {
    alert('Failed to load change history');
  } finally {
    loading.value = false;
  }
};

const getChanges = (oldData, newData) => {
  const changes = {};
  const ignoredFields = ['created_at', 'updated_at', 'deleted_at'];

  if (!oldData) {
    for (const key in newData) {
      if (!ignoredFields.includes(key)) {
        changes[key] = { old: null, new: newData[key] };
      }
    }
  } else if (!newData) {
    for (const key in oldData) {
      if (!ignoredFields.includes(key)) {
        changes[key] = { old: oldData[key], new: null };
      }
    }
  } else {
    for (const key in oldData) {
      if (!ignoredFields.includes(key) && oldData[key] !== newData[key]) {
        changes[key] = { old: oldData[key], new: newData[key] };
      }
    }
  }
  return changes;
};

const getActionDescription = (oldData, newData) => {
  if (!oldData && newData) {
    return 'Created';
  } else if (oldData && !newData) {
    return 'Deleted';
  } else if (oldData && newData) {
    return 'Changed';
  }
  return '';
};

const formattedChangeHistory = computed(() => {
  return changeHistory.value.map(history => {
    const changes = getChanges(history.changes.old, history.changes.new);
    const actionDescription = getActionDescription(history.changes.old, history.changes.new);
    return {
      ...history,
      changes,
      actionDescription,
      objectDisplay: history.objectName
        ? `${history.objectName} (ID: ${history.object_id})`
        : `ID: ${history.object_id}`
    };
  });
});

onMounted(load);
</script>

<template>
  <div>
    <h1>Change History</h1>

    <div v-if="loading"></div>
    <div v-else-if="formattedChangeHistory.length === 0"></div>
    <table v-else class="change-history-table">
      <thead>
      <tr>
        <th>Date</th>
        <th>Action</th>
        <th>Object Type</th>
        <th>Object ID</th>
        <th>Changes</th>
        <th>User</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="history in formattedChangeHistory" :key="history.id">
        <td>{{ new Date(history.date).toLocaleString() }}</td>
        <td>{{ history.actionDescription }}</td>
        <td>{{ history.object_type }}</td>
        <td>{{ history.objectDisplay }}</td>
        <td>
          <ul>
            <li v-for="(change, key) in history.changes" :key="key">
              <strong>{{ key }}:</strong>
              <template v-if="history.actionDescription === 'Created'">
                {{ change.new }}
              </template>
              <template v-else-if="history.actionDescription === 'Deleted'">
                {{ change.old }}
              </template>
              <template v-else>
                {{ change.old }} → {{ change.new }}
              </template>
            </li>
          </ul>
        </td>
        <td>{{ history.user ? `${history.user.last_name} ${history.user.first_name} ${history.user.patronymic}` : 'Unknown' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.change-history-table {
  width: 100%;
  border-collapse: collapse;
}

.change-history-table th {
  background-color: #f2f2f2;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
