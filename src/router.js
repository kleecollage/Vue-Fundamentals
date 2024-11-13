import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";
import { useDatabaseStore } from "./stores/database";
import HomeView from "./views/HomeView.vue";
import LoginView from "./views/LoginView.vue";
import RegisterView from "./views/RegisterView.vue";
import EditView from "./views/EditView.vue";
import ProfileView from "./views/ProfileView.vue";
import NotFoundView from "./views/NotFoundView.vue"
import NoFound from "ant-design-vue/es/result/noFound";

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

const redirect = async(to, from, next) => {
  // console.log(to.params.pathMatch[0])
  const databaseStore = useDatabaseStore()
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const name = await databaseStore.getDocument(to.params.pathMatch[0]);
  if (!name) {
    next();
    userStore.loadingSession = false;
  } else {
    window.location.href = name
    userStore.loadingSession = true;
    next()
  }
}

const routes = [
  {path: '/', component: HomeView, beforeEnter: requireAuth, name: 'home'},
  {path: '/edit/:id', component: EditView, beforeEnter: requireAuth, name: 'edit'},
  {path: '/profile', component: ProfileView, beforeEnter: requireAuth, name: 'profile'},
  {path: '/login', component: LoginView, name: 'login' },
  {path: '/register', component: RegisterView, name:'register' },
  // {path: '/:pathMatch(.*)*', component: () => import('ant-design-vue/es/result/noFound'), name:'404' },
  {path: '/:pathMatch(.*)*', component: NotFoundView, name:'404', beforeEnter: redirect },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router