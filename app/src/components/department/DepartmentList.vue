<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllDepartments, deleteDepartment, fetchOrganizations } from "@/services/department.js";
import AppButton from '@/components/UI/AppButton.vue'

const router = useRouter()
const departments = ref([])
const organizations = ref([])
const loading = ref(false)

const load = async () => {
  loading.value = true
  try {
    const [deptsResponse, orgsResponse] = await Promise.all([
      fetchAllDepartments(),
      fetchOrganizations()
    ])
    departments.value = deptsResponse.data
    organizations.value = orgsResponse.data
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

const getOrganizationName = (orgId) => {
  const org = organizations.value.find(o => o.id === orgId)
  return org.name
}

const getDepartmentName = (deptId) => {
  const dept = departments.value.find(d => d.id === deptId)
  return dept.name
}



onMounted(load)
</script>

<template>
  <div>
    <h1>Departments</h1>
    <AppButton @click="router.push('/departments/new')">Add New Department</AppButton>

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
        <td>{{ getOrganizationName(dept.organization_id) }}</td>
        <td>{{ dept.parent_id ? getDepartmentName(dept.parent_id) : '-' }}</td>
        <td>
          <AppButton @click="router.push(`/departments/edit/${dept.id}`)">Edit</AppButton>
          <AppButton @click="remove(dept.id)">Delete</AppButton>
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
</style>