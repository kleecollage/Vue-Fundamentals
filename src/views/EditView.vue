<template>
  <h1>Edit ID: route.params</h1>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Ingrese URL" v-model="url">
    <br /> <br />
    <button type="submit">Actualizar</button>
  </form>

</template>

<script setup>
// imports
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { userDatabaseStore } from '../stores/database';

// consts
const route = useRoute();
const databaseStore = userDatabaseStore();
const url = ref('');

// methods
const handleSubmit = () => {
  // TODO: validaciones dle input
  databaseStore.updateUrl(route.params.id, url.value);
}

onMounted( async() => {
  url.value = await databaseStore.getUrl(route.params.id)
})

// calls
console.log(route.params)
</script>