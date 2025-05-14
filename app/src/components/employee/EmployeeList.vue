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

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ru-RU')
}

const downloadFile = async (employeeId, fileId) => {
  try {
    window.open(`/api/employees/${employeeId}/files/${fileId}/download`, '_blank')
  } catch (err) {
    error.value = 'Error loading file'
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
        <th>Last Name</th>
        <th>First Name</th>
        <th>Patronymic</th>
        <th>Birth Date</th>

        <th>Passport</th>

        <th>Address</th>

        <th>Files</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="emp in employees" :key="emp.id">
        <td>{{ emp.id }}</td>
        <td>{{ emp.last_name }}</td>
        <td>{{ emp.first_name }}</td>
        <td>{{ emp.patronymic || '-' }}</td>
        <td>{{ formatDate(emp.birth_date) }}</td>

        <td>
          {{ emp.passport?.series || '-' }} {{ emp.passport?.number || '-' }}<br>
          Issued By: {{ emp.passport?.issuer || '-' }}<br>
          Issue Date: {{ formatDate(emp.passport?.issue_date) || '-' }}
        </td>

        <td>
          {{ emp.address?.region || '-' }}<br>
          {{ emp.address?.locality || '-' }}<br>
          {{ emp.address?.street || '-' }}<br>
          House: {{ emp.address?.house || '-' }}<br>
          Building: {{ emp.address?.building || '-' }}<br>
          Apartment: {{ emp.address?.apartment || '-' }}
        </td>


        <td>
          <template v-if="emp.files?.length">
            <div v-for="file in emp.files" :key="file.id" class="file-item">
              <a @click.prevent="downloadFile(emp.id, file.id)">{{ file.name }}</a>
            </div>
          </template>
          <span v-else>-</span>
        </td>

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
