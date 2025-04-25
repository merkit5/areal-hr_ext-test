<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllEmployees, deleteEmployee } from "@/services/employee.js";
import AppButton from '@/components/UI/AppButton.vue'

const router = useRouter()
const employees = ref([])
const loading = ref(false)
const error = ref(null)

const loadEmployees = async () => {
  loading.value = true
  try {
    const { data } = await fetchAllEmployees()
    employees.value = data
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this employee?')) return
  try {
    await deleteEmployee(id)
    employees.value = employees.value.filter(e => e.id !== id)
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  }
}

onMounted(loadEmployees)
</script>

<template>
  <div>
    <h1>Employee List</h1>
    <AppButton @click="router.push('/employees/new')">Add Employee</AppButton>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="!employees.length">No employees</div>

    <table v-else class="employee-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Full Name</th>
        <th>Date of Birth</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="emp in employees" :key="emp.id">
        <td>{{ emp.id }}</td>
        <td>{{ emp.last_name }} {{ emp.first_name }} {{ emp.patronymic }}</td>
        <td>{{ new Date(emp.birth_date).toLocaleDateString() }}</td>
        <td>
          <AppButton @click="router.push(`/employees/edit/${emp.id}`)">Edit</AppButton>
          <AppButton @click="handleDelete(emp.id)">Delete</AppButton>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
</style>
