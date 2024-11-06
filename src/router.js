import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import EditView from "./views/EditView.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
      next();
  } else {
      next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  {path: '/', component: HomeView, beforeEnter: requireAuth, name: 'home'},
  {path: '/edit/:id', component: EditView, beforeEnter: requireAuth, name: 'edit'},
  {path: '/login', component: LoginView, name: 'login' },
  {path: '/register', component: RegisterView, name:'register' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router