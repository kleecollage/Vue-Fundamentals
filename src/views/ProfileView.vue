<template>
  <h2>Perfil de usuario</h2>
  <!-- <p>{{ userStore.userData }}</p> -->
  <a-avatar :src="userStore.userData.photoUrl" :size="100" class="mb-5"></a-avatar>
  <a-row>
    <a-col :xs="{span: 24}" :sm="{span: 12, offset: 6}" >
      <!-- @submit.prevent="handleSubmit" -->
      <a-form
        name="basicProfile"
        autocomplete="off"
        layout="vertical"
        :model="userStore.userData"
        @finish="onFinish"
      >
        <!-- USER EMAIL -->
        <a-form-item 
          name="email"
          label="Email (no modificable)"
          :rules="[{
            required: true,
            whitespace: true,
            type: 'email',
            message: 'ingresa un correo valido'
          }]"
        >
          <a-input disabled v-model:value="userStore.userData.email"></a-input>
        </a-form-item>
        <!-- USER NAME -->
        <a-form-item
          name="displayName"
          label="Ingresa tu nickName"
          :rules="[{
            required: true,
            whitespace: true,
            message: 'Este campo no puede estar vacio'
          }]"
        >
          <a-input v-model:value="userStore.userData.displayName"></a-input>
        </a-form-item>
        <!-- USER IMAGE -->
        <a-upload 
          v-model:file-list="fileList"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :max-count="1"
          list-type="picture"
          >
          <a-button class="mb-5">Subir Foto de Perfil</a-button>
        </a-upload>

        <a-button type="default" html-type="submit" :loading="userStore.loadingUser">
          Actualizar
        </a-button>

      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useUserStore } from '../stores/user';
// CONSTANTS
const userStore = useUserStore();
const fileList = ref([]);
// METHODS
const onFinish = async() => {
  // more info on antdesign ....
  const error = await userStore.updateUser(userStore.userData.displayName, fileList.value[0])

  if (!error) return message.success('¡Perfil actualizado!')

  message.error('Error al actualizar el perfil')
};

const beforeUpload = (file) => {
  // console.log(file)
  const isValidType = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
  if (!isValidType) {
    message.error('Solo .png, .jpg o .jpeg');
    handleRemove(file)
    return
  }

  const isLt2m = file.size / 1204 / 1024 < 2;
  if (!isLt2m) {
    message.error('¡Archivos de máximo 2MB!');
    handleRemove(file)
    return
  }
  fileList.value = [...(fileList.value || []), file];
  return false
}

const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1)
  fileList.value = newFileList
}
</script>

<style scoped>
  .mb-5{
    margin-bottom: 10px
  }
  .mt-5{
    margin-top: 10px
  }
</style>