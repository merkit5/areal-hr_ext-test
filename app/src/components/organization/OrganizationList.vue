<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllOrganizations, deleteOrganization } from "@/services/organization.js";
import AppButton from '@/components/UI/AppButton.vue'

const router = useRouter()
const organizations = ref([])
const loading = ref(false)

const load = async () => {
  loading.value = true
  try {
    const { data } = await fetchAllOrganizations()
    organizations.value = data
  } catch (error) {
    alert('Failed to load organizations')
  } finally {
    loading.value = false
  }
}

const remove = async (id) => {
  if (!confirm('Are you sure you want to delete this organization?')) return
  try {
    await deleteOrganization(id)
    await load()
    alert('Organization deleted')
  } catch (error) {
    alert('Failed to delete organization')
  }
}

onMounted(load)
</script>

<template>
  <div>
    <h1>Organizations</h1>
    <AppButton @click="router.push('/organizations/new')">Add New</AppButton>

    <div v-if="loading">Loading...</div>
    <div v-else-if="organizations.length === 0">No organizations found</div>
    <table v-else class="organization-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Comment</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="org in organizations" :key="org.id">
        <td>{{ org.id }}</td>
        <td>{{ org.name }}</td>
        <td>{{ org.comment }}</td>
        <td>
          <AppButton @click="router.push(`/organizations/edit/${org.id}`)">Edit</AppButton>
          <AppButton @click="remove(org.id)">Delete</AppButton>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.organization-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
</style>
