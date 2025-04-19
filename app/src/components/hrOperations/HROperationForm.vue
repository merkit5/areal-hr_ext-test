<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  fetchHROperation,
  createHROperation,
  updateHROperation,
  fetchEmployees,
  fetchDepartments,
  fetchPositions
} from "@/services/hrOperations.js";

const route = useRoute()
const router = useRouter()
const isEditMode = !!route.params.id
const form = ref({
  operation_type: '',
  salary: '',
  date: '',
  employee_id: '',
  department_id: '',
  position_id: ''
})
const employees = ref([])
const departments = ref([])
const positions = ref([])
const error = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    const [employeesRes, departmentsRes, positionsRes] = await Promise.all([
      fetchEmployees(),
      fetchDepartments(),
      fetchPositions()
    ])

    employees.value = employeesRes.data
    departments.value = departmentsRes.data
    positions.value = positionsRes.data

    if (isEditMode) {
      const { data } = await fetchHROperation(route.params.id)
      form.value = {
        ...data,
        date: data.date.split('T')[0]
      }
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
    const payload = {
      ...form.value,
      salary: Number(form.value.salary)
    }

    if (isEditMode) {
      await updateHROperation(route.params.id, payload)
    } else {
      await createHROperation(payload)
    }
    router.push('/hr-operations')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  }
}
</script>

<template>
  <div>
    <h1>{{ isEditMode ? 'Edit' : 'Create' }} HR Operation</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="submitForm" class="operation-form">
        <div class="form-group">
          <label>Operation Type:</label>
          <input v-model="form.operation_type" required/>
        </div>

        <div class="form-group">
          <label>Salary:</label>
          <input type="number" v-model.number="form.salary" required />
        </div>

        <div class="form-group">
          <label>Date:</label>
          <input type="date" v-model="form.date" required />
        </div>

        <div class="form-group">
          <label>Employee ID:</label>
          <select v-model="form.employee_id" required>
            <option value="">Select Employee</option>
            <option
                v-for="emp in employees"
                :key="emp.id"
                :value="emp.id"
            >
              {{ emp.last_name }} {{ emp.first_name }} (ID: {{ emp.id }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Department ID:</label>
          <select v-model="form.department_id" required>
            <option value="">Select Department</option>
            <option
                v-for="dept in departments"
                :key="dept.id"
                :value="dept.id"
            >
              {{ dept.name }} (ID: {{ dept.id }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Position ID:</label>
          <select v-model="form.position_id" required>
            <option value="">Select Position</option>
            <option
                v-for="pos in positions"
                :key="pos.id"
                :value="pos.id"
            >
              {{ pos.title }} (ID: {{ pos.id }})
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="button" @click="router.push('/hr-operations')">Cancel</button>
          <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.operation-form {
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
.form-group select,
.form-group textarea {
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