<script setup>
import { useFavoritosStore } from '@/store/favoritos'
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const useFavoritos = useFavoritosStore();
const { remove } = useFavoritos;
const { favoritos } = storeToRefs(useFavoritos)
</script>

<template>
  <h1>Favoritos is working!</h1>
  <p v-if="favoritos.length == 0">Sin favoritos</p>
  <ul class="list-group">
    <li class="list-group-item bg-dark text-primary" v-for="poke in favoritos" :key="poke.id">
      <div>
        {{ poke.name }}
      </div>
      <div>
        <router-link :to="`/pokemons/${poke.name}`" class="btn btn-success btn-sm mx-2">Mas Informacion</router-link>
        <button class="btn btn-danger btn-sm" @click="remove(poke.id)">Eliminar</button>
      </div>
    </li>
  </ul>
</template>