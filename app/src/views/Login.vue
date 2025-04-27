<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/auth';

const router = useRouter();
const isAuthenticated = inject('isAuthenticated');
const checkAuthentication = inject('checkAuthentication');

const loginData = ref({ login: '', password: '' });
const error = ref(null);

const handleLogin = async () => {
  try {
    const { data } = await login(loginData.value);
    localStorage.setItem('token', data.token);
    await checkAuthentication();
    isAuthenticated.value = true;
    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="loginData.login" placeholder="Login" required autocomplete="username" />
      <input v-model="loginData.password" type="password" placeholder="Password" required autocomplete="current-password" />
      <button type="submit">Login</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>


<style scoped>

</style>