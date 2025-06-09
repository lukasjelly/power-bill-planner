<template>
  <div class="input-section">
    <h2>{{ title }}</h2>
    <div class="form-group" v-for="field in fields" :key="field.id">
      <label :for="field.id" class="form-label">
        {{ field.label }}
        <span v-if="field.required" class="text-danger">*</span>
      </label>
      <input
        :id="field.id"
        :type="field.type"
        :step="field.step"
        :min="field.min"
        :max="field.max"
        :placeholder="field.placeholder"
        :value="modelValue[field.id]"
        @input="updateValue(field.id, $event.target.value)"
        class="form-input"
      />
      <small v-if="field.help" class="help-text">{{ field.help }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputSection',
  props: {
    title: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],  methods: {
    updateValue(fieldId, value) {
      // Convert to number for number inputs
      const field = this.fields.find(f => f.id === fieldId)
      let processedValue = value
      
      if (field.type === 'number') {
        // Handle empty string and convert to number
        processedValue = value === '' ? 0 : parseFloat(value) || 0
      }
      
      // Create a new object to ensure reactivity
      const updatedValues = { ...this.modelValue }
      updatedValues[fieldId] = processedValue
      
      // Emit the updated values to parent component
      this.$emit('update:modelValue', updatedValues)
    }
  }
}
</script>

<style scoped>
.input-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.help-text {
  color: #666;
  font-size: 0.875rem;
  margin-top: 4px;
  display: block;
}

.text-danger {
  color: #dc3545;
}
</style>
