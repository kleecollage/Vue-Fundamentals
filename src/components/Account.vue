<template>
  <h2>Account Type: {{ account }}</h2>
  <h2>Balance {{ balance }}</h2>
  <h2>Account {{ state ? 'Enabled' : 'Disabled' }}</h2>
  <div v-for="(service, index) in services" :key="index">
    {{ index }} - {{ service }}
  </div>
  <ActionBalance text="Increase" @action="increase" />
  &nbsp;
  <ActionBalance text="Decrease" @action="decrease" :disabled="this.balance <= 0" />
</template>

<script>
import ActionBalance from './ActionBalance.vue';


export default {
  components: {
    ActionBalance
  },
  data() {
    return {
      balance: 500,
      account: 'VISA',
      state: true,
      services: ['transfer', 'payment', 'deposit'],
    }
  },
  methods: {
    increase() {
      this.balance += 100
    },
    decrease() {
        this.balance -= 400
    },
    showAlert() {
      if (this.balance <= 0) {
        alert("Balance Exahused")
      }
    },
  },
  watch: {
    balance(newValue) {
      if (newValue <= 0) {
        this.showAlert();
      };
    },
  },
}
</script>