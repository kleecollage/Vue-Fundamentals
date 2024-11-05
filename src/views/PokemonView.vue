<script setup>
import { useGetData } from "@/composables/getData";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const back = () => {
  router.push('/pokemons')
}
const pokeSelected = route.params.name
const { data, loading, getData, error } = useGetData()
getData(`https://pokeapi.co/api/v2/pokemon/${pokeSelected}`)

</script>

<template>
  <p v-if="loading">Cargando pokemon ...</p>
  <div class="alert alert-danger mt-2" v-if="error">{{ error }}</div>
  <div v-if="data">
    <h1>Pokemon: {{ pokeSelected }}</h1>
    <img :src="data.sprites?.front_default" alt="pokemon_image">
  </div>
  <button @click="back" class="btn btn-outline-primary">Volver</button>
</template>