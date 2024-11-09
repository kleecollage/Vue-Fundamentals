<template>
  <h1>Home</h1>
  <p>Bienvenido {{ userStore.userData?.email }}</p>
  <!-- COMPONENTE -->
  <add-form />
  <!-- TODO: SPINNER -->
  <p v-if="databaseStore.loadingDoc">Loading Docs ....</p>
  <!-- DATA CONTENT -->
   <a-space direction="vertical" v-if="!databaseStore.loadingDoc" style="width: 100%">
     <a-card v-for="item of databaseStore.documents" :title="'SHORT - ' + item.short" style="background-color: lightcyan;">
      <template #extra />
      <p>URL: {{ item.name }}</p>
      <a-space>        
        <a-button type="default" @click="router.push(`/edit/${item.id}`)">
          Editar
        </a-button>
  
        <a-popconfirm
         title="¿Seguro deseas eliminar este elemento?"
         ok-text="Awebo Perro"
         cancel-text="En otro momento"
         @confirm="confirm(item.id)"
         @cancel="cancel"
        >           
          <a-button danger :disabled="databaseStore.loading"> <!-- se sustituye por el metodo sugerido de ant-design @click="databaseStore.deleteUrl(item.id) -->
            Eliminar
          </a-button>
        </a-popconfirm>
     </a-space>
     </a-card>
   </a-space>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();

const confirm = async(id) => {
  const error = await databaseStore.deleteUrl(id)
  if (!error) {
    return message.success('Se elimino correctamente')
  }
  return message.error(error)
}

const cancel = () => {
  message.success('El elemento se conserva')
}

// Sustiumos el siguiente metodo en el componente <add-form/>
// const url = ref('');
// const handleSubmit = () => {
//   // TODO: validaciones de la url
//   databaseStore.addUrl(url.value);
// }

databaseStore.getUrls();

</script>