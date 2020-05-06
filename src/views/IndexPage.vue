<template>
  <div>
    <button @click="doLogin" :disabled="isProcessing">部屋を作成する</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';

const db = firebase.database();

export default {
  created() {
    if (this.user.uid) this.toChatPage();
  },
  data() {
    return {
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {
    user() {
      if (this.user.uid) this.toChatPage();
    },
  },
  methods: {
    toChatPage() {
      this.$router.replace(`/chat/${this.user.uid}`);
    },
    async doLogin() {
      this.isProcessing = true;
      const p = new firebase.auth.TwitterAuthProvider();
      try {
        const res = await firebase.auth().signInWithPopup(p);
        const { uid, displayName } = res.user;
        db.ref(`/users/${uid}`).set({ displayName }, () => {
          this.$store.commit('addUser', {
            uid, displayName,
          });
        });
      } catch (err) {
        console.error(err);
        alert('なんらかのえらー'); // eslint-disable-line
      }
      this.isProcessing = false;
    },
  },
};
</script>
