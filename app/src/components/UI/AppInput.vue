<template>
  <div class="form-group">
    <label :for="id">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input :id="id" v-model="modelValue" :required="required" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  required: Boolean,
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

.form-group input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.required {
  color: red;
}
</style>
