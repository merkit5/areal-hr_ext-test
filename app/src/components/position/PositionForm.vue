<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPosition, createPosition, updatePosition } from "@/services/position.js"
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'

const route = useRoute()
const router = useRouter()
const isEditMode = !!route.params.id
const form = ref({
  name: ''
})
const error = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  if (isEditMode) {
    try {
      isLoading.value = true
      const { data } = await fetchPosition(route.params.id)
      form.value.name = data.name
    } catch (err) {
      error.value = err.response?.data?.error || err.message
    } finally {
      isLoading.value = false
    }
  }
})

const validateForm = () => {
  if (!form.value.name.trim()) {
    error.value = 'Position Name is required'
    return false
  }
  return true
}

const submitForm = async () => {
  error.value = null
  if (!validateForm()) {
    return
  }

  try {
    if (isEditMode) {
      await updatePosition(route.params.id, form.value)
    } else {
      await createPosition(form.value)
    }
    router.push('/positions')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    console.error('Error saving position:', err)
  }
}
</script>

<template>
  <div>
    <h1>{{ isEditMode ? 'Edit Position' : 'Create New Position' }}</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="submitForm" class="position-form">
        <AppInput
          label="Position Name"
          v-model="form.name"
          required
        />

        <div class="form-actions">
          <AppButton
            type="button"
            @click="router.push('/positions')"
          >
            Cancel
          </AppButton>
          <AppButton type="submit">
            {{ isEditMode ? 'Update' : 'Create' }}
          </AppButton>
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

.error {
  color: red;
  margin-bottom: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>