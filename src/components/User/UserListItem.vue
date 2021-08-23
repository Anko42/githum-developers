<template>
  <v-row class="UserListItem">
    <v-col cols="1"
      ><v-img max-height="100px" :src="user.avatar_url"></v-img
    ></v-col>
    <v-col cols="5">{{ user.login }}</v-col>
    <v-col cols="3"> {{ user.repos_count }} </v-col>
    <v-col cols="3"> {{ user.followers_count }} </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "UserListItem",
  props: {
    user: {
      required: true,
    },
  },
});
</script>

<style lang="less" scoped>
.UserListItem {
  &:hover {
    background-color: #ccc;
  }
}
</style>
