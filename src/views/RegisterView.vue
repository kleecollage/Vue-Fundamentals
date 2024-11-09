<template>
  <h2 class="text-center">Registrate</h2>
  <a-row>
    <a-col :xs="{span: 24}" :sm="{span: 12, offset: 6}">
      <a-form
        name="basicRegister"
        :model="formState"
        layout="vertical"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >

        <a-form-item
          name="email"
          label="Ingrese su correo"
          :rules="[{
            required: true,
            whitespace: true,
            message: 'Ingrese un correo valido',
            type: 'email'
          }]"
        >
          <a-input v-model:value="formState.email"/>
        </a-form-item>

        <a-form-item
          name="password"
          label="Ingrese una contraseña"
          :rules="[{
            required: true,
            min: 6,
            whitespace: true,
            message: 'La contraseña debe tener almenos 6 caracteres',
          }]"
        >
          <a-input-password v-model:value="formState.password" type="password" />
        </a-form-item>

        <a-form-item
          name="repassword"
          label="Ingrese nuevamente la contraseña"
          :rules="[{
            required: true,
            min: 6,
            whitespace: true,
            validator: validatePass,
          }]"
        >
          <a-input-password v-model:value="formState.repassword" type="password" />
        </a-form-item>

        <a-button type="default" html-type="submit" :loading="userStore.loadingUser" >
            Registrarse
          </a-button>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
// IMPORTS
import { reactive } from 'vue';
import { useUserStore } from '../stores/user';
import { message } from 'ant-design-vue';


// CONSTS
const userStore = useUserStore();
const formState = reactive({
  email: "",
  password: "",
  repassword: "",
})

// METHODS
const validatePass = async(_rule, value) => {
  if (value === '') {
    return Promise.reject('Verifique su contraseña')
  }
  if (value !== formState.password) {
    return Promise.reject('Las contraseñas no son iguales')
  }
  
  return Promise.resolve()
}

const onFinish = async(values) => {
  console.log("Success: ", values)
  const error = await userStore.registerUser(formState.email, formState.password)

  if (!error){
    return message.success('Revisa tu correo electronico y verificalo')
  }

  switch (error) {
    case 'auth/email-already-in-use':
      message.warning('Este correo ya esta registrado')
      break;
    default:
      message.warning('Ha ocurrido un error. Contacte al administrador')
      break;
  }
}; 


const onFinishFailed = errorInfo => {
  console.log('Failed: ', errorInfo);
};


</script>