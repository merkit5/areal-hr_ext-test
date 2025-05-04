<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchEmployee, createEmployee, updateEmployee } from "@/services/employee.js";
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'

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

const downloadFile = async (file) => {
  try {
    const response = await fetch(`/api/employees/${route.params.id}/files/${file.id}/download`, {
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Download failed');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert('Download error');
  }
};


onMounted(async () => {
  if (!isEditMode) return;

  try {
    loading.value = true;
    const { data } = await fetchEmployee(route.params.id);

    form.value = {
      ...data,
      birth_date: data.birth_date.split('T')[0],
      passport: {
        ...data.passport,
        issue_date: data.passport.issue_date.split('T')[0],
      },
      files: (data.files || []).map(file => ({
        id: file.id,
        name: file.name,
        isServerFile: true
      }))
    };
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  } finally {
    loading.value = false;
  }
});
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
          <AppInput label="Last Name" v-model="form.last_name" required />
          <AppInput label="First Name" v-model="form.first_name" required />
          <AppInput label="Middle Name" v-model="form.patronymic" />
          <AppInput label="Date of Birth" type="date" v-model="form.birth_date" required />
        </fieldset>

        <fieldset>
          <legend>Passport Details</legend>
          <AppInput label="Series" v-model="form.passport.series" required />
          <AppInput label="Number" v-model="form.passport.number" required />
          <AppInput label="Issue Date" type="date" v-model="form.passport.issue_date" required />
          <AppInput label="Issuer Code" v-model="form.passport.issuer_code" required />
          <AppInput label="Issued By" v-model="form.passport.issuer" required />
        </fieldset>

        <fieldset>
          <legend>Address</legend>
          <AppInput label="Region" v-model="form.address.region" required />
          <AppInput label="Locality" v-model="form.address.locality" required />
          <AppInput label="Street" v-model="form.address.street" required />
          <AppInput label="House" v-model="form.address.house" required />
          <AppInput label="Building" v-model="form.address.building" />
          <AppInput label="Apartment" v-model="form.address.apartment" />
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
              <div>
                <AppButton v-if="file.isServerFile" type="button" @click="downloadFile(file)">Скачать</AppButton>
                <AppButton type="button" @click="removeFile(index)">×</AppButton>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="form-actions">
          <AppButton type="button" @click="router.push('/employees')">Cancel</AppButton>
          <AppButton type="submit">{{ isEditMode ? 'Update' : 'Create' }}</AppButton>
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

.form-group input {
  width: 100%;
  padding: 0.5rem;
}

</style>
