<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllHROperations, deleteHROperation, fetchEmployees, fetchDepartments, fetchPositions } from "@/services/hrOperations.js";
import AppButton from '@/components/UI/AppButton.vue'

const router = useRouter()
const operations = ref([])
const employees = ref([])
const departments = ref([])
const positions = ref([])
const loading = ref(false)

const loadOperations = async () => {
  loading.value = true
  try {
    const [opsResponse, employeesResponse, departmentsResponse, positionsResponse] = await Promise.all([
      fetchAllHROperations(),
      fetchEmployees(),
      fetchDepartments(),
      fetchPositions()
    ])
    operations.value = opsResponse.data
    employees.value = employeesResponse.data
    departments.value = departmentsResponse.data
    positions.value = positionsResponse.data
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

const getEmployeeName = (employeeId) => {
  const employee = employees.value.find(e => e.id === employeeId)
  return `${employee.last_name} ${employee.first_name}`
}

const getDepartmentName = (departmentId) => {
  const department = departments.value.find(d => d.id === departmentId)
  return department ? department.name : 'N/A'
}

const getPositionName = (positionId) => {
  const position = positions.value.find(p => p.id === positionId)
  return position ? position.name : 'N/A'
}

onMounted(loadOperations)
</script>

<template>
  <div>
    <h1>HR Operations</h1>
    <AppButton @click="router.push('/hr-operations/new')">Add New</AppButton>

    <div v-if="loading">Loading...</div>
    <div v-else-if="operations.length === 0">No operations found</div>
    <table v-else class="operations-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>Date</th>
        <th>Salary</th>
        <th>Employee</th>
        <th>Department</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="op in operations" :key="op.id">
        <td>{{ op.id }}</td>
        <td>{{ op.operation_type }}</td>
        <td>{{ new Date(op.date).toLocaleDateString() }}</td>
        <td>{{ op.salary }}</td>
        <td>{{ getEmployeeName(op.employee_id) }}</td>
        <td>{{ getDepartmentName(op.department_id) }}</td>
        <td>{{ getPositionName(op.position_id) }}</td>
        <td>
          <AppButton @click="router.push(`/hr-operations/edit/${op.id}`)">Edit</AppButton>
          <AppButton @click="removeOperation(op.id)">Delete</AppButton>
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
</style>
