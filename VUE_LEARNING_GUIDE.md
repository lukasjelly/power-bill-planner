# Vue.js Learning Guide - Power Bill Planner

## Project Overview
This Vue.js application helps you plan weekly power bill payments based on your billing cycles and payment schedule. It demonstrates essential Vue.js concepts in a practical, real-world application.

## Vue.js Concepts Demonstrated

### 1. **Vue 3 Composition API**
The app uses Vue 3's Composition API instead of the Options API, which provides better code organization and TypeScript support.

```javascript
import { reactive, computed } from 'vue'

export default {
  setup() {
    // All logic goes here
    return {
      // Expose data and methods to template
    }
  }
}
```

### 2. **Reactive Data with `reactive()`**
User inputs are stored in a reactive object that automatically updates the UI when values change.

```javascript
const inputs = reactive({
  currentCycleEstimate: 381.81,
  nextCycleEstimate: 377.75,
  // ... more properties
})
```

### 3. **Computed Properties**
Calculations are performed using computed properties that automatically recalculate when dependencies change.

```javascript
const calculations = computed(() => {
  // Complex calculations here
  return {
    recommendedWeeklyPayment,
    tuesdaysLeft,
    // ... more calculated values
  }
})
```

### 4. **Component Communication**

#### **Props (Parent to Child)**
```javascript
// Parent component
<InputSection
  title="📋 Billing Information"
  :fields="billingFields"
  v-model="inputs"
/>

// Child component
props: {
  title: { type: String, required: true },
  fields: { type: Array, required: true }
}
```

#### **Events (Child to Parent)**
```javascript
// Child component
this.$emit('update:modelValue', newValue)

// Parent component
@load-data="handleLoadData"
```

### 5. **Two-Way Data Binding with v-model**
The InputSection component implements v-model for seamless data binding.

```javascript
// Custom v-model implementation
props: ['modelValue'],
emits: ['update:modelValue'],
methods: {
  updateValue(fieldId, value) {
    this.$emit('update:modelValue', {
      ...this.modelValue,
      [fieldId]: value
    })
  }
}
```

### 6. **Template Directives**

#### **Conditional Rendering (v-if)**
```html
<div v-if="showDetails" class="breakdown-section">
  <!-- Content shown conditionally -->
</div>
```

#### **List Rendering (v-for)**
```html
<div v-for="field in fields" :key="field.id">
  <!-- Rendered for each field -->
</div>
```

#### **Event Handling (v-on/@)**
```html
<button @click="toggleDetails">
  {{ showDetails ? 'Hide' : 'Show' }} Details
</button>
```

#### **Class Binding**
```html
<div :class="['status-message', statusType]">
  {{ statusMessage }}
</div>
```

### 7. **Component Lifecycle**
```javascript
import { onMounted } from 'vue'

onMounted(() => {
  // Code to run when component is mounted
  updateStorageInfo()
})
```

### 8. **Scoped Styling**
Each component has scoped CSS that only applies to that component.

```vue
<style scoped>
.result-card {
  /* Styles only apply to this component */
}
</style>
```

### 9. **Services and Separation of Concerns**
Business logic is separated into service classes:

```javascript
// StorageService.js
export class StorageService {
  static saveData(data) {
    // Implementation
  }
}
```

### 10. **Responsive Design**
Mobile-first CSS with media queries ensures the app works on all devices.

```css
@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
```

## File Structure

```
src/
├── App.vue                 # Main application component
├── main.js                 # Application entry point
├── style.css              # Global styles
├── components/
│   ├── InputSection.vue    # Reusable form input component
│   ├── ResultsDisplay.vue  # Results presentation component
│   └── SaveLoadControls.vue # Data persistence controls
└── services/
    └── StorageService.js   # Local storage management
```

## Key Learning Points

### 1. **Reactivity System**
Vue's reactivity system automatically tracks dependencies and updates the DOM when data changes.

### 2. **Component Architecture**
Breaking the UI into small, reusable components makes code maintainable and testable.

### 3. **Data Flow**
- Props flow down from parent to child
- Events flow up from child to parent
- This creates a predictable data flow pattern

### 4. **State Management**
For this simple app, component state and props are sufficient. Larger apps might use Pinia/Vuex.

### 5. **Performance**
- Computed properties cache results and only recalculate when dependencies change
- v-for uses keys for efficient list updates
- Scoped styles prevent CSS conflicts

## Next Steps for Learning

1. **Add More Features**
   - Export data to CSV
   - Charts/graphs for payment visualization
   - Email reminders

2. **Advanced Vue Concepts**
   - Custom directives
   - Provide/inject for deep component communication
   - Teleport for modals/tooltips

3. **Testing**
   - Unit tests with Vitest
   - Component testing with Vue Testing Library

4. **Build Tools**
   - Understand Vite configuration
   - Add TypeScript
   - PWA features

5. **State Management**
   - Learn Pinia for complex state needs
   - Composables for shared logic

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:3000` and includes hot reload for development.
