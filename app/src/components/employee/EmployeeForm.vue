<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchEmployee, createEmployee, updateEmployee } from "@/services/employee.js";

const route = useRoute()
const router = useRouter()
const isEditMode = !!route.params.id
const loading = ref(false)
const error = ref(null)

const form = ref({
  first_name: '',
  last_name: '',
  patronymic: '',
  birth_date: '',
  passport: {
    series: '',
    number: '',
    issue_date: '',
    issuer_code: '',
    issuer: ''
  },
  address: {
    region: '',
    locality: '',
    street: '',
    house: '',
    building: '',
    apartment: ''
  },
  files: []
})

const handleFileUpload = (event) => {
  const files = event.target.files
  for (let i = 0; i < files.length; i++) {
    form.value.files.push({
      name: files[i].name,
      file: files[i]
    })
  }
}

const removeFile = (index) => {
  form.value.files.splice(index, 1)
}

const submitForm = async () => {
  error.value = null
  loading.value = true

  try {
    const formData = new FormData()

    const jsonPayload = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      patronymic: form.value.patronymic || '',
      birth_date: form.value.birth_date,
      passport: { ...form.value.passport },
      address: { ...form.value.address }
    }

    formData.append('data', JSON.stringify(jsonPayload))

    form.value.files.forEach(fileObj => {
      if (fileObj.file) {
        formData.append('files', fileObj.file)
      }
    })

    if (isEditMode) {
      await updateEmployee(route.params.id, formData)
    } else {
      await createEmployee(formData)
    }

    router.push('/employees')
  } catch (err) {
    error.value = err.response?.data?.error || err.message
    console.error('Error details:', err.response)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!isEditMode) return

  try {
    loading.value = true
    const { data } = await fetchEmployee(route.params.id)
    form.value = {
      ...data,
      birth_date: data.birth_date.split('T')[0],
      passport: {
        ...data.passport,
        issue_date: data.passport.issue_date.split('T')[0]
      }
    }
  } catch (err) {
    error.value = err.response?.data?.error || err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>{{ isEditMode ? 'Edit' : 'Create' }} Employee</h1>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="submitForm" class="employee-form">
        <fieldset>
          <legend>Basic Information</legend>
          <div class="form-group">
            <label>Last Name:</label>
            <input v-model="form.last_name" required />
          </div>

          <div class="form-group">
            <label>First Name:</label>
            <input v-model="form.first_name" required />
          </div>

          <div class="form-group">
            <label>Middle Name:</label>
            <input v-model="form.patronymic" />
          </div>

          <div class="form-group">
            <label>Date of Birth:</label>
            <input type="date" v-model="form.birth_date" required />
          </div>
        </fieldset>

        <fieldset>
          <legend>Passport Details</legend>
          <div class="form-group">
            <label>Series:</label>
            <input v-model="form.passport.series" required />
          </div>

          <div class="form-group">
            <label>Number:</label>
            <input v-model="form.passport.number" required />
          </div>

          <div class="form-group">
            <label>Issue Date:</label>
            <input type="date" v-model="form.passport.issue_date" required />
          </div>

          <div class="form-group">
            <label>Issuer Code:</label>
            <input v-model="form.passport.issuer_code" required />
          </div>

          <div class="form-group">
            <label>Issued By:</label>
            <input v-model="form.passport.issuer" required />
          </div>
        </fieldset>

        <fieldset>
          <legend>Address</legend>
          <div class="form-group">
            <label>Region:</label>
            <input v-model="form.address.region" required />
          </div>

          <div class="form-group">
            <label>Locality:</label>
            <input v-model="form.address.locality" required />
          </div>

          <div class="form-group">
            <label>Street:</label>
            <input v-model="form.address.street" required />
          </div>

          <div class="form-group">
            <label>House:</label>
            <input v-model="form.address.house" required />
          </div>

          <div class="form-group">
            <label>Building:</label>
            <input v-model="form.address.building" />
          </div>

          <div class="form-group">
            <label>Apartment:</label>
            <input v-model="form.address.apartment" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Files</legend>
          <div class="form-group">
            <label>Add Files:</label>
            <input type="file" multiple @change="handleFileUpload" />
          </div>

          <div v-if="form.files.length" class="files-list">
            <div v-for="(file, index) in form.files" :key="index" class="file-item">
              <span>{{ file.name }}</span>
              <button type="button" @click="removeFile(index)">×</button>
            </div>
          </div>
        </fieldset>

        <div class="form-actions">
          <button type="button" @click="router.push('/employees')">Cancel</button>
          <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.employee-form {
  max-width: 800px;
  margin: 0 auto;
}

fieldset {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

legend {
  padding: 0 0.5rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
}

.form-actions {
  margin-top: 1.5rem;
  text-align: right;
}

.files-list {
  margin-top: 1rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f5f5f5;
  margin-bottom: 0.5rem;
}

.error {
  color: red;
  margin-bottom: 1rem;
}
</style>
