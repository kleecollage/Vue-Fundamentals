<template>
  <Title text="Route with parameters" />
  <h2>Parameter: {{ $route.params.id }}</h2>
</template>
<script>
import Title from '@/components/Title.vue';

export default {
  components: {
    Title
  }
}
</script>