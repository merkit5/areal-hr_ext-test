<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchUser, createUser, updateUser } from "@/services/user";
import { checkAuth } from '@/services/auth';
import AppButton from '@/components/UI/AppButton.vue';
import AppInput from '@/components/UI/AppInput.vue';
import AppSelect from '@/components/UI/AppSelect.vue';

const route = useRoute();
const router = useRouter();
const isEditMode = !!route.params.id;
const form = ref({
  first_name: '',
  last_name: '',
  patronymic: '',
  login: '',
  password: '',
  role: 'manager'
});
const error = ref(null);
const isLoading = ref(false);
const showPassword = ref(false);
const currentUserRole = ref('');

const roles = computed(() => {
  const allRoles = [
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Administrator' }
  ];

  if (currentUserRole.value === 'manager') {
    return allRoles.filter(r => r.value === 'manager');
  }

  return allRoles;
});

onMounted(async () => {
  const auth = await checkAuth();
  currentUserRole.value = auth.user?.role || '';

  if (isEditMode) {
    await loadUserData();
  }
});

const loadUserData = async () => {
  try {
    isLoading.value = true;
    const { data } = await fetchUser(route.params.id);
    form.value = {
      first_name: data.first_name,
      last_name: data.last_name,
      patronymic: data.patronymic || '',
      login: data.login,
      password: '',
      role: data.role
    };
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  } finally {
    isLoading.value = false;
  }
};

const submitForm = async () => {
  error.value = null;
  try {
    const payload = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      patronymic: form.value.patronymic || null,
      login: form.value.login,
      role: form.value.role
    };

    if (form.value.password) {
      payload.password = form.value.password;
    }

    if (isEditMode) {
      await updateUser(route.params.id, payload);
    } else {
      if (!form.value.password) {
        throw new Error('Password is required for a new user');
      }
      await createUser(payload);
    }
    router.push('/users');
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  }
};
</script>

<template>
  <div>
    <h1>{{ isEditMode ? 'Edit User' : 'Create New User' }}</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <form @submit.prevent="submitForm" class="user-form">
        <AppInput label="Last Name" v-model="form.last_name" required />
        <AppInput label="First Name" v-model="form.first_name" required />
        <AppInput label="Middle Name" v-model="form.patronymic" />
        <AppInput label="Login" v-model="form.login" required />

        <div class="form-group">
          <label>Password:</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              :required="!isEditMode"
            />
            <AppButton
              type="button"
              @click="showPassword = !showPassword"
              class="toggle-password"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </AppButton>
          </div>
          <small v-if="isEditMode">Leave blank if you don't want to change the password</small>
          <small v-else>Password must be at least 8 characters long</small>
        </div>

        <AppSelect
          label="Role"
          v-model="form.role"
          :options="roles"
          required
          :disabled="currentUserRole !== 'admin'"
        />

        <div class="form-actions">
          <AppButton type="button" @click="router.push('/users')">Cancel</AppButton>
          <AppButton type="submit">{{ isEditMode ? 'Update' : 'Create' }}</AppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.user-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
}

.password-input {
  display: flex;
  gap: 0.5rem;
}
</style>
