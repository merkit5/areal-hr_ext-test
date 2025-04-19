<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPosition, updatePosition } from "@/services/position.js";

const route = useRoute()
const router = useRouter()
const form = ref({
  name: ''
})
const error = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const { data } = await fetchPosition(route.params.id)
    form.value = {
      name: data.name
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
    await updatePosition(route.params.id, form.value)
    alert('Position updated!')
    router.push('/positions')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    console.error('Error updating position:', err)
  }
}
</script>

<template>
  <div>
    <h1>Edit Position</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>
      <form @submit.prevent="submitForm" class="position-form">
        <div class="form-group">
          <label>Position Name:</label>
          <input v-model="form.name" required />
        </div>

        <div class="form-actions">
          <button type="button" @click="router.push('/positions')">Cancel</button>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.position-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
}

.form-actions {
  margin-top: 1.5rem;
}

.error {
  color: red;
  margin-bottom: 1rem;
}
</style>