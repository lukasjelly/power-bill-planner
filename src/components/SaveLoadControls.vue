<template>
  <div class="save-load-controls">
    <div class="controls-header">
      <h3>💾 Save & Load</h3>
      <p class="help-text">Your data is automatically saved locally in your browser</p>
    </div>
    
    <div class="controls-buttons">
      <button 
        @click="saveData" 
        :disabled="isSaving"
        class="btn btn-primary"
      >
        <span v-if="isSaving">Saving...</span>
        <span v-else>💾 Save Current Data</span>
      </button>
      
      <button 
        @click="loadData" 
        :disabled="!hasSavedData || isLoading"
        class="btn btn-secondary"
      >
        <span v-if="isLoading">Loading...</span>
        <span v-else>📁 Load Saved Data</span>
      </button>
      
      <button 
        @click="clearData" 
        :disabled="!hasSavedData"
        class="btn btn-danger"
      >
        🗑️ Clear Saved Data
      </button>
    </div>
    
    <div v-if="lastSavedTime" class="last-saved">
      <small>Last saved: {{ formattedLastSaved }}</small>
    </div>
    
    <!-- Status Messages -->
    <div v-if="statusMessage" :class="['status-message', statusType]">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { StorageService } from '../services/StorageService.js'

export default {
  name: 'SaveLoadControls',
  props: {
    currentData: {
      type: Object,
      required: true
    }
  },
  emits: ['load-data'],
  setup(props, { emit }) {
    // Reactive state
    const isSaving = ref(false)
    const isLoading = ref(false)
    const hasSavedData = ref(false)
    const lastSavedTime = ref(null)
    const statusMessage = ref('')
    const statusType = ref('success') // 'success', 'error', 'info'

    // Computed properties
    const formattedLastSaved = computed(() => {
      if (!lastSavedTime.value) return ''
      
      const date = new Date(lastSavedTime.value)
      return date.toLocaleString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })

    // Methods
    const saveData = async () => {
      isSaving.value = true
      statusMessage.value = ''
      
      try {
        const success = StorageService.saveData(props.currentData)
        
        if (success) {
          statusMessage.value = 'Data saved successfully!'
          statusType.value = 'success'
          updateStorageInfo()
        } else {
          throw new Error('Failed to save data')
        }
      } catch (error) {
        statusMessage.value = 'Failed to save data. Please try again.'
        statusType.value = 'error'
        console.error('Save error:', error)
      } finally {
        isSaving.value = false
        clearStatusMessage()
      }
    }

    const loadData = async () => {
      isLoading.value = true
      statusMessage.value = ''
      
      try {
        const savedData = StorageService.loadData()
        
        if (savedData) {
          emit('load-data', savedData)
          statusMessage.value = 'Data loaded successfully!'
          statusType.value = 'success'
        } else {
          throw new Error('No saved data found')
        }
      } catch (error) {
        statusMessage.value = 'Failed to load data. Please try again.'
        statusType.value = 'error'
        console.error('Load error:', error)
      } finally {
        isLoading.value = false
        clearStatusMessage()
      }
    }

    const clearData = async () => {
      if (!confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
        return
      }

      try {
        const success = StorageService.clearData()
        
        if (success) {
          statusMessage.value = 'Saved data cleared successfully!'
          statusType.value = 'success'
          updateStorageInfo()
        } else {
          throw new Error('Failed to clear data')
        }
      } catch (error) {
        statusMessage.value = 'Failed to clear data. Please try again.'
        statusType.value = 'error'
        console.error('Clear error:', error)
      } finally {
        clearStatusMessage()
      }
    }

    const updateStorageInfo = () => {
      hasSavedData.value = StorageService.hasSavedData()
      lastSavedTime.value = StorageService.getLastSavedTime()
    }

    const clearStatusMessage = () => {
      setTimeout(() => {
        statusMessage.value = ''
      }, 3000)
    }

    // Lifecycle
    onMounted(() => {
      updateStorageInfo()
    })

    return {
      isSaving,
      isLoading,
      hasSavedData,
      lastSavedTime,
      statusMessage,
      statusType,
      formattedLastSaved,
      saveData,
      loadData,
      clearData
    }
  }
}
</script>

<style scoped>
.save-load-controls {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.controls-header {
  margin-bottom: 20px;
}

.controls-header h3 {
  margin: 0 0 5px 0;
}

.help-text {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
}

.controls-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
}

.last-saved {
  margin-bottom: 10px;
  color: #666;
  font-style: italic;
}

.status-message {
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  text-align: center;
  font-weight: 500;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-message.info {
  background-color: #cce7ff;
  color: #004085;
  border: 1px solid #99d3ff;
}

@media (max-width: 768px) {
  .controls-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
