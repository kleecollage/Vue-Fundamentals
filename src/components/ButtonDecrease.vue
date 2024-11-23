<template>
  <button @click="actionDecrement(150)">Reduce 150</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['actionDecrement'])
  }
}
</script>