<template>
  <h1>Home</h1>
  <p>Bienvenido {{ userStore.userData?.email }}</p>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { userDatabaseStore } from '../stores/database';

const userStore = useUserStore();
const databaseStore = userDatabaseStore();

databaseStore.getUrls();

</script>