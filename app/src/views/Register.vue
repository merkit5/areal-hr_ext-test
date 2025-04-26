<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/services/auth';

const router = useRouter();
const registerData = ref({
  first_name: '',
  last_name: '',
  patronymic: '',
  login: '',
  password: '',
  role: 'hr',
});
const error = ref(null);

const handleRegister = async () => {
  try {
    await register(registerData.value);
    router.push('/login');
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  }
};
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="registerData.first_name" placeholder="First Name" required />
      <input v-model="registerData.last_name" placeholder="Last Name" required />
      <input v-model="registerData.patronymic" placeholder="Patronymic" />
      <input v-model="registerData.login" placeholder="Login" required autocomplete="username" />
      <input v-model="registerData.password" type="password" placeholder="Password" required autocomplete="new-password" />
      <select v-model="registerData.role" required>
        <option value="hr">HR</option>
        <option value="manager">Manager</option>
        <option value="admin">Administrator</option>
      </select>
      <button type="submit">Register</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<style scoped>
</style>
