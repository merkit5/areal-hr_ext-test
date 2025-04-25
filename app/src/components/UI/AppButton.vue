<template>
  <button :type="type" @click="handleClick">
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
button {
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
}
</style>
