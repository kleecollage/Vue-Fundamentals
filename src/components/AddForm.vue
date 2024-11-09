<template>
  <a-form name="addform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">

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
        Agregar URL
      </a-button>
    </a-form-item>

  </a-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/database'
import { message } from "ant-design-vue";

// CONSTS
const databaseStore = useDatabaseStore();
const formState = reactive({
  url: ''
})

// METHODS
const onFinish = async (value) => {
  console.log('todo correcto ' + value)
  const error = await databaseStore.addUrl(formState.url);
  if (!error) {
    return message.success('URL agregada')
  }

  switch(error) {
    // TODO: buscar los cases de error
    default:
      message.error(
        "Ocurrio un error en el servidor. Contacte con el administrador"
      );
      break;
  }
}

</script>