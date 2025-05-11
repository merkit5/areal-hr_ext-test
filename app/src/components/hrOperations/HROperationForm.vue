<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  fetchHROperation,
  createHROperation,
  updateHROperation,
  fetchEmployees,
  fetchDepartments,
  fetchPositions,
  fetchEmployeeHistory
} from "@/services/hrOperations.js";
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppSelect from '@/components/UI/AppSelect.vue'

const route = useRoute()
const router = useRouter()
const isEditMode = !!route.params.id
const form = ref({
  operation_type: 'hire',
  salary: '',
  date: new Date().toISOString().split('T')[0],
  employee_id: '',
  department_id: '',
  position_id: ''
})
const employees = ref([])
const departments = ref([])
const positions = ref([])
const employeeHistory = ref([])
const error = ref(null)
const isLoading = ref(false)

// Доступные типы операций
const operationTypes = ref([
  { value: 'hire', label: 'Прием на работу' },
  { value: 'fire', label: 'Увольнение' },
  { value: 'promote', label: 'Повышение' },
  { value: 'demote', label: 'Понижение' },
  { value: 'transfer', label: 'Перевод' }
])

const availableOperations = computed(() => {
  if (!form.value.employee_id) return operationTypes.value

  const lastOperation = employeeHistory.value[0]?.operation_type
  const currentEmployee = employees.value.find(e => e.id === form.value.employee_id)

  if (!currentEmployee) return operationTypes.value

  const operations = [...operationTypes.value]

  if (!lastOperation || lastOperation === 'fire') {
    return operations.filter(op => op.value === 'hire')
  }

  if (lastOperation === 'hire') {
    return operations.filter(op => ['fire', 'promote', 'demote', 'transfer'].includes(op.value))
  }

  return operations.filter(op => op.value !== 'hire')
})

const visibleFields = computed(() => {
  const fields = {
    employee_id: true,
    date: true,
    operation_type: true
  }

  switch(form.value.operation_type) {
    case 'hire':
      return {
        ...fields,
        salary: true,
        department_id: true,
        position_id: true
      }
    case 'promote':
    case 'demote':
    case 'transfer':
      return {
        ...fields,
        salary: true,
        department_id: form.value.operation_type === 'transfer',
        position_id: true
      }
    case 'fire':
      return fields
    default:
      return fields
  }
})

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
      await loadEmployeeHistory(data.employee_id)
    }
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  } finally {
    isLoading.value = false
  }
})

const loadEmployeeHistory = async (employeeId) => {
  try {
    const { data } = await fetchEmployeeHistory(employeeId)
    employeeHistory.value = data
  } catch (err) {
    console.error('Failed to load employee history', err)
  }
}

watch(() => form.value.employee_id, async (newVal) => {
  if (newVal) {
    await loadEmployeeHistory(newVal)
    const lastOperation = employeeHistory.value[0]
    if (lastOperation) {
      form.value.department_id = lastOperation.department_id
      form.value.position_id = lastOperation.position_id
    }
  }
})

const submitForm = async () => {
  error.value = null
  try {
    const payload = {
      ...form.value,
      salary: form.value.operation_type === 'fire' ? null : Number(form.value.salary),
      department_id: form.value.operation_type === 'fire' ? null : form.value.department_id,
      position_id: form.value.operation_type === 'fire' ? null : form.value.position_id
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
          :options="availableOperations"
          required
        />

        <AppInput
          v-if="visibleFields.date"
          label="Дата"
          type="date"
          v-model="form.date"
          required
        />

        <AppSelect
          v-if="visibleFields.employee_id"
          label="Сотрудник"
          v-model="form.employee_id"
          :options="employees.map(emp => ({
            value: emp.id,
            label: `${emp.last_name} ${emp.first_name}`
          }))"
          required
        />

        <AppInput
          v-if="visibleFields.salary"
          label="Зарплата"
          type="number"
          v-model.number="form.salary"
          :required="visibleFields.salary"
        />

        <AppSelect
          v-if="visibleFields.department_id"
          label="Отдел"
          v-model="form.department_id"
          :options="departments.map(dept => ({
            value: dept.id,
            label: dept.name
          }))"
          :required="visibleFields.department_id"
        />

        <AppSelect
          v-if="visibleFields.position_id"
          label="Должность"
          v-model="form.position_id"
          :options="positions.map(pos => ({
            value: pos.id,
            label: pos.name
          }))"
          :required="visibleFields.position_id"
        />

        <div class="form-actions">
          <AppButton type="button" @click="router.push('/hr-operations')">
            Отмена
          </AppButton>
          <AppButton type="submit">
            {{ isEditMode ? 'Обновить' : 'Создать' }}
          </AppButton>
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