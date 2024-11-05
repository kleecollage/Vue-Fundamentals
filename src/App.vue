<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  <h1 class="text-center">PokeAPI</h1>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="container-fluid">
        <RouterLink to="/" class="btn btn-outline-secondary me-2">Home</RouterLink>
        <RouterLink to="/pokemons" class="btn btn-outline-secondary ">Pokemons</RouterLink>
      </div>
    </div>
  </nav>
  <div class="container text-center">
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
