<template>
  <div id="app">
    <router-view v-if="initialized" />
    <div v-else>初期化中</div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  data() {
    return {
      initialized: false,
    };
  },
  created() {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      unsub();
      this.initialized = true;

      if (!user) return;
      this.$store.commit('addUser', {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    });
  },
};
</script>
