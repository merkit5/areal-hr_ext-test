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

const operationTypes = ref([
  { value: 'hire', label: 'Прием на работу' },
  { value: 'fire', label: 'Увольнение' },
  { value: 'promote', label: 'Повышение' },
  { value: 'demote', label: 'Понижение' },
  { value: 'transfer', label: 'Перевод' }
])

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
    <h1>{{ isEditMode ? 'Редактирование' : 'Создание' }} кадровой операции</h1>

    <div v-if="isLoading">Загрузка...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="submitForm" class="operation-form">
        <AppSelect
          label="Тип операции"
          v-model="form.operation_type"
          :options="operationTypes"
          required
        />
        <AppInput label="Зарплата" type="number" v-model.number="form.salary" required />
        <AppInput label="Дата" type="date" v-model="form.date" required />

        <AppSelect
          label="Сотрудник"
          v-model="form.employee_id"
          :options="employees.map(emp => ({ value: emp.id, label: `${emp.last_name} ${emp.first_name}` }))"
          required
        />

        <AppSelect
          label="Отдел"
          v-model="form.department_id"
          :options="departments.map(dept => ({ value: dept.id, label: `${dept.name}` }))"
          required
        />

        <AppSelect
          label="Должность"
          v-model="form.position_id"
          :options="positions.map(pos => ({ value: pos.id, label: `${pos.name}` }))"
          required
        />

        <div class="form-actions">
          <AppButton type="button" @click="router.push('/hr-operations')">Отмена</AppButton>
          <AppButton type="submit">{{ isEditMode ? 'Обновить' : 'Создать' }}</AppButton>
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
