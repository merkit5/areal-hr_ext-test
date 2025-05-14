<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchOrganization, createOrganization, updateOrganization } from "@/services/organization";
import AppButton from '@/components/UI/AppButton.vue';
import AppInput from '@/components/UI/AppInput.vue';

const route = useRoute();
const router = useRouter();
const isEditMode = !!route.params.id;
const form = ref({
  name: '',
  comment: ''
});
const error = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  if (isEditMode) {
    await loadOrganizationData();
  }
});

const loadOrganizationData = async () => {
  try {
    isLoading.value = true;
    const { data } = await fetchOrganization(route.params.id);
    form.value = {
      name: data.name,
      comment: data.comment || ''
    };
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  } finally {
    isLoading.value = false;
  }
};

const validateForm = () => {
  if (!form.value.name.trim()) {
    error.value = 'Name is required';
    return false;
  }
  return true;
};

const submitForm = async () => {
  error.value = null;
  if (!validateForm()) {
    return;
  }

  try {
    if (isEditMode) {
      await updateOrganization(route.params.id, form.value);
    } else {
      await createOrganization(form.value);
    }
    router.push('/organizations');
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  }
};
</script>

<template>
  <div>
    <h1>{{ isEditMode ? 'Edit Organization' : 'Create New Organization' }}</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="submitForm" class="organization-form">
        <AppInput
          label="Name"
          v-model="form.name"
          required
        />

        <div class="form-group">
          <label>Comment:</label>
          <textarea
            v-model="form.comment"
          />
        </div>

        <div class="form-actions">
          <AppButton type="button" @click="router.push('/organizations')">Cancel</AppButton>
          <AppButton type="submit">
            {{ isEditMode ? 'Update' : 'Create' }}
          </AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.organization-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.error {
  color: red;
  margin-bottom: 1rem;
}
</style>