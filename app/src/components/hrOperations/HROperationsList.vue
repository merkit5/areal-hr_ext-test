<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllHROperations, deleteHROperation } from "@/services/hrOperations.js";

const router = useRouter()
const operations = ref([])
const loading = ref(false)

const loadOperations = async () => {
  loading.value = true
  try {
    const { data } = await fetchAllHROperations()
    operations.value = data
  } catch (error) {
    alert('Failed to load HR operations')
  } finally {
    loading.value = false
  }
}

const removeOperation = async (id) => {
  if (!confirm('Are you sure you want to delete the operation?')) return
  try {
    await deleteHROperation(id)
    await loadOperations()
    alert('Operation deleted')
  } catch (error) {
    alert('Failed to delete operation')
  }
}

onMounted(loadOperations)
</script>

<template>
  <div>
    <h1>HR Operations</h1>
    <button @click="router.push('/hr-operations/new')">Add New</button>

    <div v-if="loading">Loading...</div>
    <div v-else-if="operations.length === 0">No operations found</div>
    <table v-else class="operations-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>Date</th>
        <th>Salary</th>
        <th>Employee ID</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="op in operations" :key="op.id">
        <td>{{ op.id }}</td>
        <td>{{ op.operation_type }}</td>
        <td>{{ new Date(op.date).toLocaleDateString() }}</td>
        <td>{{ op.salary }}</td>
        <td>{{ op.employee_id }}</td>
        <td>
          <button @click="router.push(`/hr-operations/edit/${op.id}`)">Edit</button>
          <button @click="removeOperation(op.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.operations-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.operations-table th, .operations-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.operations-table th {
  background-color: #f2f2f2;
}

button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
}
</style>