<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllPositions, deletePosition } from "@/services/position.js";

const router = useRouter()
const positions = ref([])
const loading = ref(false)

const load = async () => {
  loading.value = true
  try {
    const { data } = await fetchAllPositions()
    positions.value = data
  } catch (error) {
    alert('Failed to load positions')
  } finally {
    loading.value = false
  }
}

const remove = async (id) => {
  if (!confirm('Are you sure you want to delete this post?')) return
  try {
    await deletePosition(id)
    positions.value = positions.value.filter(pos => pos.id !== id)
    alert('Position deleted')
  } catch (error) {
    alert('Failed to delete post')
    console.error('Delete error:', error)
  }
}

onMounted(load)
</script>

<template>
  <div>
    <h1>Positions</h1>
    <button @click="router.push('/positions/new')">Add New Position</button>

    <div v-if="loading">Loading...</div>
    <div v-else-if="positions.length === 0">No positions found</div>
    <table v-else class="position-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="pos in positions" :key="pos.id">
        <td>{{ pos.id }}</td>
        <td>{{ pos.name }}</td>
        <td>
          <button @click="router.push(`/positions/edit/${pos.id}`)">Edit</button>
          <button @click="remove(pos.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.position-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.position-table th, .position-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.position-table th {
  background-color: #f2f2f2;
}

button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
}
</style>