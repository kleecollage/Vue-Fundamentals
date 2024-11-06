<template>
  <h1>Home</h1>
  <p>Bienvenido {{ userStore.userData?.email }}</p>

  <form @submit.prevent="handleSubmit">
    <input v-model="url" type="text" placeholder="Ingrese URL " />
    <button type="submit">Agregar</button>
  </form>

  <p v-if="databaseStore.loadingDoc">Loading Docs ....</p>
  <ul v-else>
    <li v-for="item in databaseStore.documents" :key="item.id">
       ID: {{ item.id }} <br /> URL: {{ item.name }} <br /> SHORT: {{ item.short }} <br />
       <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button> &nbsp;
       <button @click="router.push(`/edit/${item.id}`)">Editar</button>
       <hr />
    </li>
  </ul>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { userDatabaseStore } from '../stores/database';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const databaseStore = userDatabaseStore();
const url = ref('');

const handleSubmit = () => {
  // TODO: validaciones de la url
  databaseStore.addUrl(url.value);
}

databaseStore.getUrls();

</script>