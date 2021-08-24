<template>
  <v-row class="UserListItem" @click="showDetail">
    <v-col cols="3"
      ><v-img
        max-width="100px"
        max-height="100px"
        :src="user.avatar_url"
      ></v-img
    ></v-col>
    <v-col cols="9" md="4">{{ user.login }}</v-col>
    <v-col cols="2" v-if="!is_mobile"> {{ user.repos_count }} </v-col>
    <v-col cols="3" v-if="!is_mobile"> {{ user.followers_count }} </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "UserListItem",
  props: {
    user: {
      required: true,
    },
  },
  computed: {
    is_mobile() {
      const { $vuetify } = this;
      return $vuetify.breakpoint.sm || $vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions({
      loadUserDetail: "loadUserDetailWithReposAndFollowers",
    }),

    showDetail: async function () {
      const { user } = this;
      await this.loadUserDetail(user);
      this.$router.push({
        name: "UserDetail",
        params: { username: user.login },
      });
    },
  },
});
</script>

<style lang="less" scoped>
.UserListItem {
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
}
</style>
