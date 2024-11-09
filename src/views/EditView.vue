<template>
  <h1>Edit ID: {{ route.params.id }}</h1>
  <a-form name="editform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">

    <a-form-item name="url" label="Ingrese una url" :rules="[{
      required: true,
      whitespace: true,
      pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      message: 'Esta URL no es valida'
    }]">
      <a-input v-model:value="formState.url" />
    </a-form-item>

    <a-form-item>
      <a-button type="default" html-type="submit" :loading="databaseStore.loading">
        Actualizar
      </a-button>
    </a-form-item>

  </a-form>


</template>

<script setup>
// IMPORTS
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';
import { message } from 'ant-design-vue';

// CONSTS
const route = useRoute();
const databaseStore = useDatabaseStore();
const formState = reactive({
  url: "",
})

// METHODS
const onFinish = async (value) => {
  console.log('todo correcto ' + value)
  const error = await databaseStore.updateUrl(route.params.id, formState.url);
  if (!error) {
    formState.url = "";
    return message.success('URL actualizada')
  }

  switch (error) {
    // TODO: buscar los cases de error
    default:
      message.error(
        "Ocurrio un error en el servidor. Contacte con el administrador"
      );
      break;
  }
}

// el siguiente metodo se sustituye por el uso de ant-design
// const handleSubmit = () => {
//   // TODO: validaciones dle input
//   databaseStore.updateUrl(route.params.id, url.value);
// }

onMounted(async () => {
  formState.url = await databaseStore.getUrl(route.params.id)
})

// calls
console.log(route.params)
</script>