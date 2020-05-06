<template>
  <div>
    <div v-if="isConnected">★接続中★</div>
    <div v-else>
      待機中<br>
      このページのURLを相手に送ろう
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import Peer from 'skyway-js';

const db = firebase.database();

export default {
  data() {
    return {
      isConnected: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  async created() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const peer = new Peer({ key: process.env.VUE_APP_SKYWAY_KEY });

    peer.on('open', () => {
      db.ref(`/peers/${this.user.uid}`).set({ id: peer.id });
    });

    peer.on('call', async (con) => {
      alert('接続しました'); // eslint-disable-line
      con.answer(stream);
      this.isConnected = true;
      this.$emit('connected', con);
    });
  },
};
</script>
