<script setup>
import { ref, onMounted } from 'vue';
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

onMounted(load);
</script>

<template>
  <div>
    <h1>Change History</h1>

    <div v-if="loading"></div>
    <div v-else-if="changeHistory.length === 0"></div>
    <table v-else class="change-history-table">
      <thead>
      <tr>
        <th>Date</th>
        <th>Object Type</th>
        <th>Object ID</th>
        <th>Changes</th>
        <th>User ID</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="history in changeHistory" :key="history.id">
        <td>{{ new Date(history.date).toLocaleString() }}</td>
        <td>{{ history.object_type }}</td>
        <td>{{ history.object_id }}</td>
        <td>
          <pre>{{ JSON.stringify(history.changes, null, 2) }}</pre>
        </td>
        <td>{{ history.user_id }}</td>
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
