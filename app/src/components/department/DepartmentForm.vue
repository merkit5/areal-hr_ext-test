<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  fetchDepartment,
  createDepartment,
  updateDepartment,
  fetchOrganizations,
  fetchParentDepartments
} from "@/services/department.js"
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppSelect from '@/components/UI/AppSelect.vue'

const route = useRoute()
const router = useRouter()
const isEditMode = !!route.params.id
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

const loadInitialData = async () => {
  try {
    loading.value = true

    const [orgsResponse, parentsResponse] = await Promise.all([
      fetchOrganizations(),
      fetchParentDepartments()
    ])

    organizations.value = orgsResponse.data
    parentDepartments.value = parentsResponse.data

    if (isEditMode) {
      const deptResponse = await fetchDepartment(route.params.id)
      form.value = {
        name: deptResponse.data.name,
        comment: deptResponse.data.comment || '',
        organization_id: deptResponse.data.organization_id,
        parent_id: deptResponse.data.parent_id || null
      }
    }
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  if (!form.value.name.trim()) {
    error.value = 'Name is required'
    return false
  }
  if (!form.value.organization_id) {
    error.value = 'Organization is required'
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
      await updateDepartment(route.params.id, form.value)
    } else {
      await createDepartment(form.value)
    }
    router.push('/departments')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    console.error('Error saving department:', err)
  }
}

onMounted(loadInitialData)
</script>

<template>
  <div>
    <h1>{{ isEditMode ? 'Edit Department' : 'Create New Department' }}</h1>

    <div v-if="loading">Loading data...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="submitForm" class="department-form">
        <AppInput
          v-model="form.name"
          label="Name:"
          required
          id="name"
        />

        <AppInput
          v-model="form.comment"
          label="Comment:"
          id="comment"
        />

        <AppSelect
          v-model="form.organization_id"
          label="Organization:"
          :options="organizations.map(org => ({ value: org.id, label: org.name }))"
          required
          id="organization"
        />

        <AppSelect
          v-model="form.parent_id"
          label="Parent Department (optional):"
          :options="[{ value: null, label: 'None' }, ...parentDepartments.map(dept => ({ value: dept.id, label: dept.name }))]"
          id="parent"
        />

        <div class="form-actions">
          <AppButton
            type="button"
            @click="router.push('/departments')"
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
.department-form {
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