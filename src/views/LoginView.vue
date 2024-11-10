<template>
  <h2 class="text-center">Iniciar Sesion</h2>
  <a-row>
    <a-col :xs="{span: 24}" :sm="{span: 12, offset: 6}" >
      <!-- @submit.prevent="handleSubmit" -->
      <a-form
        name="basicLogin"
        autocomplete="off"
        layout="vertical"
        :model="formState"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item 
          name="email"
          label="Ingresa tu correo"
          :rules="[{
            required: true,
            whitespace: true,
            type: 'email',
            message: 'ingresa un correo valido'
          }]"
        >
          <a-input v-model:value="formState.email"></a-input>
        </a-form-item>
      
        <a-form-item 
          name="password"
          label="Ingresa tu contraseña" 
          :rules="[{
            required: true,
            min: 6,
            message: 'ingresa una contraseña de almenos 6 caracteres',
          }]"
        >
          <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>
        
        <a-button type="default" html-type="submit" :loading="userStore.loadingUser">
          Acceder
        </a-button>

      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { reactive } from 'vue';
import { useUserStore } from '../stores/user';
import { message } from 'ant-design-vue';

// CONSTS
// const email = ref('john.d@mail.com');
// const password = ref('12345678');
const userStore = useUserStore();
const formState = reactive({
  email: "john.d@mail.com",
  password: "12345678"
})

// METHODS
/* ahora validamos desde ant-design
const handleSubmit = async() => {
  // if (!email.value || password.value.length < 6) {
  //   return alert('¡Hay campos vacios!')
  // }
   await userStore.loginUser(formState.email, formState.password)
}
*/

const onFinish = async(values) => {
  // console.log("Success: ", values)
  const error = await userStore.loginUser(formState.email, formState.password)

  if (!error){
    return message.success('Bienvenido')
  }

  switch (error) {
    // TODO: implementar mas cases
    case 'auth/invalid-credential':
      message.warning('Usuario o contraseña invalidos')
      break;
    default:
      message.warning('Ha ocurrido un error. Contacte al administrador')
      break;
  }
}

const onFinishFailed = errorInfo => {
  console.log('Failed: ', errorInfo);
};


</script>