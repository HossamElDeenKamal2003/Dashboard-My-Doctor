import { createRouter, createWebHistory } from 'vue-router'
import mainDashboard from '../views/mainDashboard.vue';
import AuthComponent from '../views/autComponent.vue';
import overView from '../views/overviewComponent.vue';
import patientComponent from "../views/patientsComponent.vue";
import setttingComponent from "../views/settingComponent.vue";
import logoutComponent from "../views/logoutComponent.vue";
const routes = [
  {
    path: '/',
    name: "overView",
    component: overView
  },
  {
    path: '/login',
    name: "AuthComponent",
    component: AuthComponent
  },
  {
    path: '/dashboard',
    name: "mainDashboard",
    component: mainDashboard
  },
  {
    path: "/dashboard-patient",
    name: "patientComponent",
    component: patientComponent
  },
  {
    path: "/dashboard-setting",
    name: "setttingComponent",
    component: setttingComponent
  },
  {
    path: "/logout",
    name: "logoutComponent",
    component: logoutComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router