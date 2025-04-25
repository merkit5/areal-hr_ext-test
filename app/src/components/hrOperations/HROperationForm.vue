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
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppSelect from '@/components/UI/AppSelect.vue'

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
        <AppInput label="Operation Type" v-model="form.operation_type" required />
        <AppInput label="Salary" type="number" v-model.number="form.salary" required />
        <AppInput label="Date" type="date" v-model="form.date" required />

        <AppSelect
            label="Employee ID"
            v-model="form.employee_id"
            :options="employees.map(emp => ({ value: emp.id, label: `${emp.last_name} ${emp.first_name} (ID: ${emp.id})` }))"
            required
        />

        <AppSelect
            label="Department ID"
            v-model="form.department_id"
            :options="departments.map(dept => ({ value: dept.id, label: `${dept.name} (ID: ${dept.id})` }))"
            required
        />

        <AppSelect
            label="Position ID"
            v-model="form.position_id"
            :options="positions.map(pos => ({ value: pos.id, label: `${pos.title} (ID: ${pos.id})` }))"
            required
        />

        <div class="form-actions">
          <AppButton type="button" @click="router.push('/hr-operations')">Cancel</AppButton>
          <AppButton type="submit">{{ isEditMode ? 'Update' : 'Create' }}</AppButton>
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
</style>
