<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Title text="My Dynamic Bank 2.0" />
  <Account />
</template>

<script>
import Account from './components/Account.vue';
import Title from './components/Title.vue';

export default {
  name: 'App',
  components: {
    Title,
    Account
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
