<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select :id="id" v-model="modelValue" :required="required">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  required: Boolean,
  options: Array,
  id: String
})

const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

watch(modelValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
}

.form-group select {
  width: 100%;
  padding: 0.5rem;
}
</style>
