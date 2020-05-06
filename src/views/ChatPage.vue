<template>
  <div>
    <template v-if="initialized">
      <template v-if="!pageUser">
        存在しないページです
      </template>
      <template v-else-if="!isMyPage">
        <div v-if="pageUser">
          <div>{{ pageUser.displayName }}さんのページ</div>
          <button>通話開始</button>
        </div>
      </template>
      <div v-else>
        ここはあなたのページです
      </div>
    </template>
    <div v-else>
      初期化中
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';

const db = firebase.database();

export default {
  data() {
    return {
      initialized: false,
      pageUser: null,
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
  },
  computed: {
    ...mapState(['user']),
    pageId() {
      return this.$route.params.channel_id;
    },
    isMyPage() {
      return this.user.uid === this.pageId;
    },
  },
};
</script>
