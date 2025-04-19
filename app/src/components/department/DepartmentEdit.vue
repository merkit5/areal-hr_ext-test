<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchDepartment, updateDepartment, fetchOrganizations, fetchParentDepartments } from "@/services/department.js";

const route = useRoute()
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
    const [deptResponse, orgsResponse, parentsResponse] = await Promise.all([
      fetchDepartment(route.params.id),
      fetchOrganizations(),
      fetchParentDepartments()
    ])

    form.value = {
      name: deptResponse.data.name,
      comment: deptResponse.data.comment || '',
      organization_id: deptResponse.data.organization_id,
      parent_id: deptResponse.data.parent_id || null
    }

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
    await updateDepartment(route.params.id, form.value)
    alert('Department updated')
    router.push('/departments')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    console.error('Error updating', err)
  }
}
</script>

<template>
  <div>
    <h1>Edit Department</h1>
    <div v-if="loading"></div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>
      <form @submit.prevent="submitForm" class="department-form">
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
          <button type="submit">Update</button>
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