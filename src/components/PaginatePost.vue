<script setup>

  defineProps(["inicio", "fin", "maxLength"]);

  const emit = defineEmits(['next', 'prev'])

  const depuracion = () => {
    console.log("has dado click en next")
    emit("next")
  }
</script>

<template>
  <div class="btn-group mb-2" role="group" aria-label="Basic Example">
    <button
      @click="$emit('prev')"
      type="button"
      class="btn btn-outline-primary"
      :disabled="inicio <= 0"
    >Previous {{ inicio }}</button>

    <button
      @click="depuracion"
      type="button"
      class="btn btn-outline-primary"
      :disabled="fin >= maxLength"
    >Next {{ fin }}</button>

  </div>
</template>