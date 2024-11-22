<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Title text="Home Page" />
  </div>
</template>

<script>
// @ is an alias to /src
import Title from '@/components/Title.vue';

export default {
  name: 'HomeView',
  components: {
    Title
  }
}
</script>
