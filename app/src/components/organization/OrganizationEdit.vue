<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchOrganization, updateOrganization } from "@/services/organization.js";
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'

const route = useRoute()
const router = useRouter()
const form = ref({ name: '', comment: '' })
const error = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await fetchOrganization(route.params.id)
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
    await updateOrganization(route.params.id, form.value)
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
      <form @submit.prevent="submitForm" class="organization-form">
        <AppInput label="Name" v-model="form.name" required />

        <div class="form-group">
          <label>Comment:</label>
          <textarea v-model="form.comment" />
        </div>

        <div class="form-actions">
          <AppButton type="button" @click="router.push('/organizations')">Cancel</AppButton>
          <AppButton type="submit">Update</AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.organization-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.5rem;
}

</style>
