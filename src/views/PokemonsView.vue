<script setup>
import { RouterLink } from 'vue-router';
import { useGetData } from '@/composables/getData';

const { data, loading, getData } = useGetData();

getData("https://pokeapi.co/api/v2/pokemon")

</script>

<template>
  <h1>Pokemons</h1>
  <p v-if="loading">Cargando pokemons ...</p>
  <div v-if="data">
    <ul v-for="pokemon in data.results" class="list-group">
      <li class="list-group-item mb-2 bg-dark">
        <router-link :to="`/pokemons/${pokemon.name}`">{{ pokemon.name }}</router-link>
      </li>
    </ul>
    <button :disabled="!data.previous" class="btn btn-outline-warning me-2 mt-4" @click="getData(data.previous)">Previous</button>
    <button :disabled="!data.next" class="btn btn-outline-warning mt-4" @click="getData(data.next)">Next</button>
  </div>
</template>