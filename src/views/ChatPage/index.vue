<template>
  <div>
    <owner-content v-if="isMyPage" @onConnected="connected" />
    <guest-content v-else :page-id="pageId" @connected="connected" />
    <audio ref="their" autoplay></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import OwnerContent from './OwnerContent.vue';
import GuestContent from './GuestContent.vue';

export default {
  components: {
    OwnerContent,
    GuestContent,
  },
  computed: {
    ...mapState(['user']),
    pageId() {
      return this.$route.params.page_id;
    },
    isMyPage() {
      return this.user.uid === this.pageId;
    },
  },
  methods: {
    connected(con) {
      con.on('stream', (st) => {
        this.$refs.their.srcObject = st;
        this.$refs.their.play();
      });
    },
  },
};
</script>
