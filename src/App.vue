<template>
  <a-layout class="layout" style="min-height: 100vh;">

    <a-layout-header>
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" v-model:selectedKeys="selectedKeys">

        <a-menu-item v-if="userStore.userData" key="home">
          <router-link to="/">Home</router-link>
        </a-menu-item>

        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link to="/login">Login</router-link>
        </a-menu-item>

        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="/register">Register</router-link>
        </a-menu-item>

        <a-menu-item @click="userStore.logoutUser" v-if="userStore.userData" key="logout">
          Logout
        </a-menu-item>

      </a-menu>
      <nav v-if="!userStore.loadingSession">
      </nav>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px;">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '75vh'}">
        <div v-if="userStore.loadingSession"> loading user ... </div>
        <router-view></router-view>
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>

</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from './stores/user';
// consts
const selectedKeys = ref([]);
const userStore = useUserStore();
const route = useRoute();

// calls
// console.log(route.name)
watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name]
  }
);

</script>

<style scoped>

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>

