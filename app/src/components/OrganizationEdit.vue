<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const form = ref({ name: '', comment: '' })
const error = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`/api/organizations/${route.params.id}`)
    form.value = {
      name: response.data.name || '',
      comment: response.data.comment || ''
    }
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  } finally {
    isLoading.value = false
  }
})

const submitForm = async () => {
  error.value = null
  try {
    const response = await axios.put(
        `/api/organizations/${route.params.id}`,
        form.value,
        { headers: { 'Content-Type': 'application/json' } }
    )
    router.push('/organizations')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    console.error('Error updating organization:', err)
  }
}
</script>

<template>
  <div>
    <h1>Edit Organization</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>
      <form @submit.prevent="submitForm">
        <label>Name:</label>
        <input v-model="form.name" required />
        <label>Comment:</label>
        <textarea v-model="form.comment" />
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error { color: red; margin-bottom: 1rem; }
</style>
