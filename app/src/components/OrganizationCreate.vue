<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchOrganization, createOrganization, updateOrganization } from "@/services/organization.js";

const route = useRoute()
const router = useRouter()
const isEditMode = !!route.params.id
const form = ref({ name: '', comment: '' })
const error = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  if (!isEditMode) return

  isLoading.value = true
  try {
    const { data } = await fetchOrganization(route.params.id)
    form.value = data
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  } finally {
    isLoading.value = false
  }
})

const submitForm = async () => {
  error.value = null
  try {
    if (isEditMode) {
      await updateOrganization(route.params.id, form.value)
    } else {
      await createOrganization(form.value)
    }

    router.push('/organizations')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    alert(`Error: ${error.value}`)
  }
}
</script>

<template>
  <div>
    <h1>{{ isEditMode ? 'Edit' : 'Create' }} Organization</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="submitForm">
        <div>
          <label>Name:</label>
          <input v-model="form.name" required />
        </div>

        <div>
          <label>Comment:</label>
          <textarea v-model="form.comment"></textarea>
        </div>

        <div>
          <button type="button" @click="router.push('/organizations')">Cancel</button>
          <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-bottom: 1rem;
}
button {
  margin-right: 10px;
}
</style>
