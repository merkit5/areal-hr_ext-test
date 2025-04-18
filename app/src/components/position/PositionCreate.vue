<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPosition } from "@/services/position.js";

const router = useRouter()
const form = ref({
  name: ''
})
const error = ref(null)

const submitForm = async () => {
  error.value = null
  try {
    await createPosition(form.value)
    alert('Position created successfully!')
    router.push('/positions')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    alert(`Error: ${error.value}`)
  }
}
</script>

<template>
  <div>
    <h1>Create Position</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="submitForm" class="position-form">
      <div class="form-group">
        <label>Position Name:</label>
        <input v-model="form.name" required />
      </div>

      <div class="form-actions">
        <button type="button" @click="router.push('/positions')">Cancel</button>
        <button type="submit">Create</button>
      </div>
    </form>
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