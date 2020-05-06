import Vue from 'vue';
import VueRouter from 'vue-router';

import IndexPage from '../views/IndexPage.vue';
import ChatPage from '../views/ChatPage/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/chat/:page_id',
    name: 'Chat',
    component: ChatPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
