<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllOrganizations, deleteOrganization} from "@/services/organization.js";

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
  if (!confirm('Вы уверены, что хотите удалить эту организацию?')) return
  try {
    await deleteOrganization(id)
    await load()
    alert('Организация успешно удалена')
  } catch (error) {
    alert('Не удалось удалить организацию')
  }
}

onMounted(load)
</script>

<template>
  <div>
    <h1>Organizations</h1>
    <button @click="router.push('/organizations/new')">Add New</button>

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
          <button @click="router.push(`/organizations/edit/${org.id}`)">Edit</button>
          <button @click="remove(org.id)">Delete</button>
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

.organization-table th, .organization-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.organization-table th {
  background-color: #f2f2f2;
}

button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
}
</style>
