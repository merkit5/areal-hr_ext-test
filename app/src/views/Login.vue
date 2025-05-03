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
    await login(loginData.value);
    await checkAuthentication();
    isAuthenticated.value = true;
    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.error || err.message;
  }
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <input
        v-model="loginData.login"
        placeholder="Login"
        required
        autocomplete="username"
        class="login-input"
      />
      <input
        v-model="loginData.password"
        type="password"
        placeholder="Password"
        required
        autocomplete="current-password"
        class="login-input"
      />
      <button type="submit" class="login-button">Login</button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
}

.login-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  padding: 0.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
