<template>
  <button :type="type" @click="handleClick" class="app-button">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.app-button {
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 6px;
  background-color: #3498db; /* основной синий */
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.app-button:hover {
  background-color: #2980b9;
}

.app-button:active {
  transform: scale(0.96);
}

.app-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
