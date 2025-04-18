<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createDepartment, fetchOrganizations, fetchParentDepartments } from "@/services/department.js";

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
    alert('Department created successfully!')
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
      <div class="form-group">
        <label>Name:</label>
        <input v-model="form.name" required />
      </div>

      <div class="form-group">
        <label>Comment:</label>
        <textarea v-model="form.comment"></textarea>
      </div>

      <div class="form-group">
        <label>Organization:</label>
        <select v-model="form.organization_id" required>
          <option v-for="org in organizations" :key="org.id" :value="org.id">
            {{ org.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Parent Department (optional):</label>
        <select v-model="form.parent_id">
          <option :value="null">None</option>
          <option v-for="dept in parentDepartments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>

      <div class="form-actions">
        <button type="button" @click="router.push('/departments')">Cancel</button>
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.department-form {
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

.form-group input,
.form-group textarea,
.form-group select {
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