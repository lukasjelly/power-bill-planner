<template>
    <form>
        <label>
            Current Billing Cycle Estimate
            <input type="number" v-model="form.currentBillingCycleEstimate" />
        </label>
        <label>
            Next Billing Cycle Estimate
            <input type="number" v-model="form.nextBillingCycleEstimate" />
        </label>
    </form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                currentBillingCycleEstimate: '',
                nextBillingCycleEstimate: ''
            }
        }
    }
}
</script>