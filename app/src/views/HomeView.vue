<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const isAuthenticated = inject('isAuthenticated');

const navigateTo = (path) => {
  if (isAuthenticated.value) {
    router.push(path);
  } else {
    router.push('/login');
  }
};
</script>

<template>
  <div class="home-container" v-if="isAuthenticated">
    <h1>HR Management System</h1>
    <div class="card-grid">
      <div class="card" @click="navigateTo('/organizations')">
        <h2>Organizations</h2>
      </div>
      <div class="card" @click="navigateTo('/departments')">
        <h2>Departments</h2>
      </div>
      <div class="card" @click="navigateTo('/positions')">
        <h2>Positions</h2>
      </div>
      <div class="card" @click="navigateTo('/employees')">
        <h2>Employees</h2>
      </div>
      <div class="card" @click="navigateTo('/hr-operations')">
        <h2>Hr operations</h2>
      </div>
      <div class="card" @click="navigateTo('/users')">
        <h2>Users</h2>
      </div>
      <div class="card" @click="navigateTo('/changeHistory')">
        <h2>Change history</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.card-grid {
  display: grid;
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card h2 {
  margin-top: 0;
  color: #2c3e50;
}

.card p {
  color: #666;
  margin-bottom: 0;
}
</style>