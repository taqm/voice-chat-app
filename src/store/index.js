import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      uid: null,
      displayName: null,
    },
  },
  mutations: {
    addUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
  },
  modules: {
  },
});
