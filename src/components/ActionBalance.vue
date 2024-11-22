<template >
  <!-- EMIT EVENT -->
  <!-- <button @click="this.$emit('action')">{{ text }} Balance</button> -->
  <button @click="action">{{ text }} Balance</button>
</template>
<script>
export default {
  props: {
    text: String,
    isDisable: {
      type: Boolean,
    }
  },
  methods: {
    action() {
      this.$emit('action')
    }
  }
}
</script>