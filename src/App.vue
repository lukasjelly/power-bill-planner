<template>  <div class="app">
    <header class="text-center mb-3">
      <h1>💡 Power Bill Planner</h1>
      <p>Plan your weekly payments to stay on top of your power bills</p>
    </header>

    <!-- Save/Load Controls -->
    <SaveLoadControls 
      :current-data="inputs"
      @load-data="handleLoadData"
    />

    <div class="grid grid-2">
      <!-- Billing Information Input -->
      <InputSection
        title="📋 Billing Information"
        :fields="billingFields"
        v-model="inputs"
      />

      <!-- Date Information Input -->
      <InputSection
        title="📅 Billing Cycle Dates"
        :fields="dateFields"
        v-model="inputs"
      />
    </div>

    <!-- Results Display -->
    <ResultsDisplay
      title="Calculation Results"
      :calculations="calculations"
    />

    <!-- Cycle Information -->
    <div class="container">
      <h3>📈 Cycle Information</h3>
      <div class="cycle-info">
        <div class="info-item">
          <span class="info-label">Adjusted End Date:</span>
          <span class="info-value">{{ formattedAdjustedEndDate }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Next Cycle Start:</span>
          <span class="info-value">{{ formattedNextCycleStart }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Days Until Next Payment Day:</span>
          <span class="info-value">{{ daysUntilNextTuesday }}</span>
        </div>
      </div>
    </div>    <!-- Help Section -->
    <div class="container">
      <h3>💡 How it works</h3>
      <div class="help-content">
        <div class="help-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>Enter Billing Information</h4>
            <p>Input your current and next billing cycle estimated costs, along with any pre-purchased power and account balance.</p>
          </div>
        </div>
        
        <div class="help-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Set Your Dates</h4>
            <p>Configure your billing cycle dates and payment schedule. The app aligns payments with Tuesdays (your payday).</p>
          </div>
        </div>
        
        <div class="help-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>Get Your Payment Plan</h4>
            <p>The app calculates exactly how much you need to pay weekly to cover both billing cycles, factoring in your account balance.</p>
          </div>
        </div>
      </div>
      
      <div class="tips-section mt-3">
        <h4>💡 Tips for Success:</h4>
        <ul>
          <li>Set up automatic payments for your calculated weekly amount</li>
          <li>Check your account balance regularly and update the app</li>
          <li>If you buy additional power, update the "Power Already Bought" field</li>
          <li>Review and adjust your estimates each billing cycle</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import InputSection from './components/InputSection.vue'
import ResultsDisplay from './components/ResultsDisplay.vue'
import SaveLoadControls from './components/SaveLoadControls.vue'

export default {
  name: 'App',
  components: {
    InputSection,
    ResultsDisplay,
    SaveLoadControls
  },
  setup() {
    // Reactive data for inputs - this demonstrates Vue 3's Composition API
    const inputs = reactive({
      currentCycleEstimate: 381.81,
      nextCycleEstimate: 377.75,
      powerBought: 0,
      accountBalance: 9.46,
      todayDate: '2025-05-26',
      currentCycleStart: '2025-05-25',
      currentCycleEnd: '2025-06-24',
      daysToNextTuesday: 6
    })

    // Field configurations for the input components
    const billingFields = [
      {
        id: 'currentCycleEstimate',
        label: 'Current Cycle - Estimated Cost ($)',
        type: 'number',
        step: '0.01',
        placeholder: '381.81',
        required: true,
        help: 'Estimated power cost from 25th of current month to 24th of next month'
      },
      {
        id: 'nextCycleEstimate',
        label: 'Next Cycle - Estimated Cost ($)',
        type: 'number',
        step: '0.01',
        placeholder: '377.75',
        required: true,
        help: 'Estimated cost for the upcoming billing cycle'
      },
      {
        id: 'powerBought',
        label: 'Current Cycle - Power Already Bought ($)',
        type: 'number',
        step: '0.01',
        placeholder: '0.00',
        help: 'Amount of power already purchased this cycle. Leave blank or $0 if none.'
      },
      {
        id: 'accountBalance',
        label: 'Account Balance (+ Credit / - Debt) ($)',
        type: 'number',
        step: '0.01',
        placeholder: '9.46',
        required: true,
        help: 'Current account balance: positive means credit, negative means debt'
      }
    ]

    const dateFields = [
      {
        id: 'todayDate',
        label: "Today's Date",
        type: 'date',
        required: true,
        help: 'Current date for payment calculations'
      },
      {
        id: 'currentCycleStart',
        label: 'Current Cycle - Start Date',
        type: 'date',
        required: true,
        help: 'Start date of your current billing cycle'
      },
      {
        id: 'currentCycleEnd',
        label: 'Current Cycle - End Date',
        type: 'date',
        required: true,
        help: 'End date of your current billing cycle'
      },
      {
        id: 'daysToNextTuesday',
        label: 'Days to Next Tuesday After Current Cycle',
        type: 'number',
        min: '0',
        max: '6',
        placeholder: '6',
        help: 'Number of days to add to align with your Tuesday payment schedule'
      }
    ]    // Computed properties for calculations - this demonstrates reactive computations
    const calculations = computed(() => {
      const today = new Date(inputs.todayDate)
      const cycleStart = new Date(inputs.currentCycleStart)
      const cycleEnd = new Date(inputs.currentCycleEnd)
      
      // Calculate adjusted end date (cycle end + days to next Tuesday)
      const adjustedEndDate = new Date(cycleEnd)
      adjustedEndDate.setDate(adjustedEndDate.getDate() + inputs.daysToNextTuesday)
      
      // Calculate next cycle dates
      const nextCycleStart = new Date(cycleEnd)
      nextCycleStart.setDate(nextCycleStart.getDate() + 1)
      
      const nextCycleEnd = new Date(nextCycleStart)
      nextCycleEnd.setMonth(nextCycleEnd.getMonth() + 1)
      nextCycleEnd.setDate(nextCycleEnd.getDate() - 1)
      
      // Calculate days and costs
      const currentCycleDays = Math.ceil((adjustedEndDate - cycleStart) / (1000 * 60 * 60 * 24))
      const nextCycleDays = Math.ceil((nextCycleEnd - nextCycleStart) / (1000 * 60 * 60 * 24))
      const combinedCyclesTotalDays = currentCycleDays + nextCycleDays
      
      const combinedTotalCost = inputs.currentCycleEstimate + inputs.nextCycleEstimate
      const averageDailyCost = combinedTotalCost / combinedCyclesTotalDays
      const averageWeeklyCost = averageDailyCost * 7
      
      // Calculate spillover cost
      const spilloverCost = averageDailyCost * inputs.daysToNextTuesday
      const adjustedCurrentCycleTotal = inputs.currentCycleEstimate + spilloverCost
      
      // Calculate remaining to pay
      const remainingToPay = adjustedCurrentCycleTotal - inputs.accountBalance - inputs.powerBought
      
      // Calculate Tuesdays left in current cycle
      const tuesdaysLeft = calculateTuesdaysLeft(today, adjustedEndDate)
      
      // Calculate recommended weekly payment
      const recommendedWeeklyPayment = tuesdaysLeft > 0 ? remainingToPay / tuesdaysLeft : 0
      
      return {
        adjustedEndDate,
        nextCycleStart,
        tuesdaysLeft,
        combinedCyclesTotalDays,
        combinedTotalCost,
        averageDailyCost,
        averageWeeklyCost,
        spilloverCost,
        adjustedCurrentCycleTotal,
        remainingToPay,
        recommendedWeeklyPayment
      }
    })    // Helper function to calculate Tuesdays left - demonstrates pure functions
    function calculateTuesdaysLeft(startDate, endDate) {
      let count = 0
      const current = new Date(startDate)
      
      while (current <= endDate) {
        if (current.getDay() === 2) { // Tuesday is day 2
          count++
        }
        current.setDate(current.getDate() + 1)
      }
      
      return count
    }

    // Additional computed properties for display formatting
    const formattedAdjustedEndDate = computed(() => {
      return calculations.value.adjustedEndDate.toLocaleDateString('en-AU', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: '2-digit'
      })
    })

    const formattedNextCycleStart = computed(() => {
      return calculations.value.nextCycleStart.toLocaleDateString('en-AU', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: '2-digit'
      })
    })    
    
    const daysUntilNextTuesday = computed(() => {
      const today = new Date(inputs.todayDate)
      const nextTuesday = new Date(today)
      const daysUntilTuesday = (2 - today.getDay() + 7) % 7
      nextTuesday.setDate(today.getDate() + (daysUntilTuesday === 0 ? 7 : daysUntilTuesday))
      
      return Math.ceil((nextTuesday - today) / (1000 * 60 * 60 * 24))
    })

    // Methods for handling save/load operations
    const handleLoadData = (savedData) => {
      // Update inputs with loaded data
      Object.assign(inputs, savedData)
    }

    // Return all reactive data and computed properties
    return {
      inputs,
      billingFields,
      dateFields,
      calculations,
      formattedAdjustedEndDate,
      formattedNextCycleStart,
      daysUntilNextTuesday,
      handleLoadData
    }
  }
}
</script>

<style scoped>
.cycle-info {
  display: grid;
  gap: 15px;
  margin-top: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #007bff;
}

.info-label {
  font-weight: 500;
  color: #555;
}

.info-value {
  font-weight: bold;
  color: #007bff;
}

.help-content {
  margin: 20px 0;
}

.help-step {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.step-number {
  background: #007bff;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.step-content p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.tips-section {
  background: #e8f5e8;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.tips-section h4 {
  margin: 0 0 10px 0;
  color: #155724;
}

.tips-section ul {
  margin: 0;
  padding-left: 20px;
}

.tips-section li {
  margin-bottom: 8px;
  color: #155724;
}

@media (max-width: 768px) {
  .info-item {
    flex-direction: column;
    text-align: center;
  }
  
  .info-label {
    margin-bottom: 5px;
  }
  
  .help-step {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    margin: 0 auto 10px auto;
  }
}
</style>
