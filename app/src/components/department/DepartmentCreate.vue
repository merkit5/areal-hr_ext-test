<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createDepartment, fetchOrganizations, fetchParentDepartments } from "@/services/department.js";
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppSelect from '@/components/UI/AppSelect.vue'

const router = useRouter()
const form = ref({
  name: '',
  comment: '',
  organization_id: null,
  parent_id: null
})
const organizations = ref([])
const parentDepartments = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const orgsResponse = await fetchOrganizations()
    const parentsResponse = await fetchParentDepartments()
    organizations.value = orgsResponse.data
    parentDepartments.value = parentsResponse.data
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  } finally {
    loading.value = false
  }
})

const submitForm = async () => {
  error.value = null
  try {
    await createDepartment(form.value)
    alert('Department created')
    router.push('/departments')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    alert(`Error: ${error.value}`)
  }
}
</script>

<template>
  <div>
    <h1>Create Department</h1>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading">Loading data...</div>

    <form @submit.prevent="submitForm" class="department-form" v-else>
      <AppInput v-model="form.name" label="Name:" required id="name" />
      <AppInput v-model="form.comment" label="Comment:" id="comment" />
      <AppSelect v-model="form.organization_id" label="Organization:" :options="organizations.map(org => ({ value: org.id, label: org.name }))" required id="organization" />
      <AppSelect v-model="form.parent_id" label="Parent Department (optional):" :options="[{ value: null, label: 'None' }, ...parentDepartments.map(dept => ({ value: dept.id, label: dept.name }))]" id="parent" />

      <div class="form-actions">
        <AppButton type="button" @click="router.push('/departments')">Cancel</AppButton>
        <AppButton type="submit">Create</AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.department-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>