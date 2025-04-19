<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchUser, createUser, updateUser } from "@/services/user";

const route = useRoute();
const router = useRouter();
const isEditMode = !!route.params.id;
const form = ref({
  first_name: '',
  last_name: '',
  patronymic: '',
  login: '',
  password: '',
  role: 'hr'
});
const error = ref(null);
const isLoading = ref(false);
const showPassword = ref(false);

const roles = [
  { value: 'hr', label: 'HR' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Administrator' }
];

onMounted(async () => {
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
      password: data.password || '',
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
          <label>Login:</label>
          <input v-model="form.login" required />
        </div>

        <div class="form-group">
          <label>Password:</label>
          <div class="password-input">
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                :required="!isEditMode"
            />
            <button
                type="button"
                @click="showPassword = !showPassword"
                class="toggle-password"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <small v-if="isEditMode">Leave blank if you don't want to change the password</small>
          <small v-else>Password must be at least 8 characters long</small>
        </div>

        <div class="form-group">
          <label>Role:</label>
          <select v-model="form.role" required>
            <option
                v-for="role in roles"
                :key="role.value"
                :value="role.value"
            >
              {{ role.label }}
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="button" @click="router.push('/users')">Cancel</button>
          <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
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

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
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

.password-input input {
  flex-grow: 1;
}

.toggle-password {
  padding: 0.5rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
}

.form-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
}

.error {
  color: red;
  margin-bottom: 1rem;
}

small {
  display: block;
  margin-top: 0.3rem;
  color: #666;
  font-size: 0.8rem;
}
</style>
