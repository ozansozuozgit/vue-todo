import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../layouts/Home.vue';
import Signup from '../layouts/auth/Signup';
import Login from '../layouts/auth/Login';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
