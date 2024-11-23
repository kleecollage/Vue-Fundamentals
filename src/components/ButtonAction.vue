<template>
  <button @click="actionButton({state: state, number: 50})">{{ buttonText }}</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props:{
    state: Boolean
  },
  methods:{
    ...mapActions(['actionButton'])
  },
  computed: {
    buttonText() {
      return this.state ? 'Increment' : 'Decrement'
    }
  }
}
</script>