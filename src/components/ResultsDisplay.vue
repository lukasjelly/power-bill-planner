<template>
  <div class="results-display">
    <h2>📊 {{ title }}</h2>
    
    <!-- Summary Cards -->
    <div class="results-grid">
      <div 
        v-for="result in summaryResults" 
        :key="result.label"
        class="result-item"
      >
        <div class="result-value" :class="result.colorClass">
          {{ result.formatted }}
        </div>
        <div class="result-label">{{ result.label }}</div>
      </div>
    </div>

    <!-- Main Recommendation -->
    <div class="result-card">
      <div class="result-label">{{ recommendation.label }}</div>
      <div class="result-amount">{{ recommendation.formatted }}</div>
      <div class="result-description">{{ recommendation.description }}</div>
    </div>

    <!-- Detailed Breakdown -->
    <div class="breakdown-section" v-if="showDetails">
      <h3>💰 Detailed Breakdown</h3>
      <div class="breakdown-grid">
        <div 
          v-for="detail in detailResults" 
          :key="detail.label"
          class="breakdown-item"
        >
          <span class="breakdown-label">{{ detail.label }}:</span>
          <span class="breakdown-value">{{ detail.formatted }}</span>
        </div>
      </div>
    </div>

    <button 
      @click="toggleDetails" 
      class="btn btn-secondary mt-3"
    >
      {{ showDetails ? 'Hide Details' : 'Show Details' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ResultsDisplay',
  props: {
    title: {
      type: String,
      default: 'Calculation Results'
    },
    calculations: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDetails: false
    }
  },
  computed: {
    recommendation() {
      return {
        label: 'Recommended Weekly Payment',
        formatted: this.formatCurrency(this.calculations.recommendedWeeklyPayment),
        description: 'Pay this amount every Tuesday to stay on track'
      }
    },
    summaryResults() {
      return [
        {
          label: 'Tuesdays Left',
          formatted: this.calculations.tuesdaysLeft.toString(),
          colorClass: this.calculations.tuesdaysLeft < 3 ? 'text-warning' : 'text-success'
        },
        {
          label: 'Total Days',
          formatted: this.calculations.combinedCyclesTotalDays.toString(),
          colorClass: ''
        },
        {
          label: 'Daily Cost',
          formatted: this.formatCurrency(this.calculations.averageDailyCost),
          colorClass: ''
        },
        {
          label: 'Remaining to Pay',
          formatted: this.formatCurrency(this.calculations.remainingToPay),
          colorClass: this.calculations.remainingToPay < 0 ? 'text-success' : ''
        }
      ]
    },
    detailResults() {
      return [
        {
          label: 'Combined Total Cost',
          formatted: this.formatCurrency(this.calculations.combinedTotalCost)
        },
        {
          label: 'Average Weekly Cost',
          formatted: this.formatCurrency(this.calculations.averageWeeklyCost)
        },
        {
          label: 'Spillover Cost',
          formatted: this.formatCurrency(this.calculations.spilloverCost)
        },
        {
          label: 'Adjusted Current Cycle Total',
          formatted: this.formatCurrency(this.calculations.adjustedCurrentCycleTotal)
        }
      ]
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
      }).format(amount || 0)
    },
    toggleDetails() {
      this.showDetails = !this.showDetails
    }
  }
}
</script>

<style scoped>
.results-display {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.result-item {
  text-align: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.result-value {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.result-label {
  font-size: 0.875rem;
  color: #666;
}

.result-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
}

.result-amount {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 10px 0;
}

.result-description {
  font-size: 1rem;
  opacity: 0.9;
  margin-top: 10px;
}

.breakdown-section {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.breakdown-grid {
  display: grid;
  gap: 10px;
  margin-top: 15px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.breakdown-label {
  font-weight: 500;
}

.breakdown-value {
  font-weight: bold;
  color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.text-success {
  color: #28a745;
}

.text-warning {
  color: #ffc107;
}

.text-danger {
  color: #dc3545;
}

@media (max-width: 768px) {
  .result-amount {
    font-size: 2rem;
  }
  
  .results-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .breakdown-item {
    flex-direction: column;
    text-align: center;
  }
  
  .breakdown-label {
    margin-bottom: 5px;
  }
}
</style>
