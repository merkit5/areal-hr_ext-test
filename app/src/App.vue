<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/organizations">Organizations</RouterLink>
      <RouterLink to="/departments">Departments</RouterLink>
      <RouterLink to="/positions">Positions</RouterLink>
      <RouterLink to="/employees">Employees</RouterLink>
      <RouterLink to="/hr-operations">Hr operations</RouterLink>
      <RouterLink to="/users">Users</RouterLink>
      <RouterLink to="/changeHistory">ChangeHistory</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  background: #f3f3f3;
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

nav a {
  text-decoration: none;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

nav a:hover {
  background: #e0e0e0;
}

nav a.router-link-exact-active {
  background: #42b983;
  color: white;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>