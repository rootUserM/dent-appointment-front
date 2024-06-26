import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginView.vue'
import Dashboard from "../views/DashBoard.vue"
import ConsultingRoomDetail from "../views/ConsultingRoom/RoomDetail.vue"
import FormAppointment from "../views/Public_gen_appointment.vue"
import Patients from "../views/Px/PxList.vue"
import PatientsDetail from "../views/Px/PxDetail.vue"
import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { public: true }
  },
  
  {
    path: '/dashboard/consultingroom/patients-all/:id',
    name: 'patients',
    component: Patients,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/detail/patient/:id',
    name: 'patients_detail',
    component: PatientsDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/consultingroom/:id",
    name: "consulting_room_detail",
    component: ConsultingRoomDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/appointment/gen/:id",
    name: "appointment_gen",
    component: FormAppointment,
    meta: { public: true }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});
router.afterEach((to) => {
  // Update document title based on the current route
  document.title = to.meta.title || 'Expert Appointment';
});

export default router
