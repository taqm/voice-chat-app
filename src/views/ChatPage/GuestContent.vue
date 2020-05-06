<template>
  <div>
    <div v-if="isConnected">
      {{pageUser.displayName}}さんと通話中
    </div>
    <div v-else-if="initialized">
      <div>{{ pageUser.displayName }} さんの部屋</div>
      <button @click="doCall">通話開始</button>
    </div>
    <div v-else>
      初期化中
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Peer from 'skyway-js';

const db = firebase.database();

export default {
  props: ['pageId'],
  data() {
    return {
      pageUser: null,
      pagePeerId: null,
      initialized: false,
      isConnected: false,
    };
  },

  async created() {
    try {
      const value = await db.ref(`/users/${this.pageId}`).once('value');
      const pageUser = value.val();
      this.pageUser = pageUser;
      this.initialized = true;
    } catch (err) {
      console.error(err);
      alert('なんらかのえらー'); // eslint-disable-line
    }

    db.ref(`/peers/${this.pageId}`).on('value', (v) => {
      this.pagePeerId = v.val()?.id ?? null;
    });
  },
  methods: {
    async doCall() {
      const peer = new Peer({ key: process.env.VUE_APP_SKYWAY_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log(this.pagePeerId);
      const con = peer.call(this.pagePeerId, stream);
      this.isConnected = true;
      this.$emit('connected', con);
    },
  },
};
</script>
