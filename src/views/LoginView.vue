<template>
  <h1>Login</h1>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="Ingrese su email" v-model.trim="email">
    <input type="password" placeholder="Ingrese su contraseña" v-model.trim="password">
    <button type="submit" :disabled="userStore.loadingUser">Acceder</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const email = ref('john.d@mail.com');
const password = ref('12345678');


const handleSubmit = async() => {
  if (!email.value || password.value.length < 6) {
    return alert('¡Hay campos vacios!')
  }
  await userStore.loginUser(email.value, password.value)
}


</script>