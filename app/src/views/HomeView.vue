<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="home-container">
    <h1>HR Management System</h1>
    <div class="card-grid">
      <div class="card" @click="navigateTo('/organizations')">
        <h2>Organizations</h2>
        <p>Manage company organizations</p>
      </div>
      <div class="card" @click="navigateTo('/departments')">
        <h2>Departments</h2>
        <p>Manage company departments</p>
      </div>
      <div class="card" @click="navigateTo('/positions')">
        <h2>Positions</h2>
        <p>Manage company positions</p>
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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