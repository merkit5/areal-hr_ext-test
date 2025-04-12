<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/organizations">Organizations</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  padding: 16px;
  background: #f3f3f3;
}
nav a {
  margin-right: 16px;
}
</style>