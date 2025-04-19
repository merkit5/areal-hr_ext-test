<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllDepartments, deleteDepartment } from "@/services/department.js";

const router = useRouter()
const departments = ref([])
const loading = ref(false)

const load = async () => {
  loading.value = true
  try {
    const { data } = await fetchAllDepartments()
    departments.value = data
  } catch (error) {
    alert('Failed to load departments')
  } finally {
    loading.value = false
  }
}

const remove = async (id) => {
  if (!confirm('Are you sure you want to delete this department?')) return
  try {
    await deleteDepartment(id)
    departments.value = departments.value.filter(dept => dept.id !== id)
    alert('Department deleted')
  } catch (error) {
    alert('Failed to delete department')
    console.error('Delete error:', error)
  }
}

onMounted(load)
</script>

<template>
  <div>
    <h1>Departments</h1>
    <button @click="router.push('/departments/new')">Add New Department</button>

    <div v-if="loading">Loading...</div>
    <div v-else-if="departments.length === 0"></div>
    <table v-else class="department-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Comment</th>
        <th>Organization</th>
        <th>Parent Department</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="dept in departments" :key="dept.id">
        <td>{{ dept.id }}</td>
        <td>{{ dept.name }}</td>
        <td>{{ dept.comment || '-' }}</td>
        <td>{{ dept.organization_id }}</td>
        <td>{{ dept.parent_id || '-' }}</td>
        <td>
          <button @click="router.push(`/departments/edit/${dept.id}`)">Edit</button>
          <button @click="remove(dept.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.department-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.department-table th, .department-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.department-table th {
  background-color: #f2f2f2;
}

button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
}
</style>