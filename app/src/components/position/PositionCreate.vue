<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPosition } from "@/services/position.js";
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'

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
    await router.push('/positions')
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
      <AppInput label="Position Name" v-model="form.name" required />

      <div class="form-actions">
        <AppButton type="button" @click="router.push('/positions')">Cancel</AppButton>
        <AppButton type="submit">Create</AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.position-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
