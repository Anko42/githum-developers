<template>
  <v-card class="UserList">
    <v-card-title class="UserListHeader">
      <v-row>
        <v-col cols="1">&nbsp;</v-col>
        <v-col cols="5">Login</v-col>
        <v-col cols="3"> Repos count</v-col>
        <v-col cols="3"> Followers count </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="px-0">
      <UserListItem
        v-for="(user, index) in users"
        :key="`UserListItem-${index}`"
        :user="user"
      />
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col class="pagination"> paginate </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import UserListItem from "./UserListItem.vue";

export default Vue.extend({
  name: "UserList",
  components: {
    UserListItem,
  },
  mounted() {
    //this.fetchUsers();
  },
  computed: {
    ...mapGetters(["GET_USERS", "IS_USER_LIST_LOADING"]),
    loading() {
      return this.IS_USER_LIST_LOADING;
    },

    users() {
      return this.GET_USERS;
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),
  },
});
</script>

<style lang="less">

.UserList{
  .v-cart__text{
    padding: 0!important;
  }
}
.UserListHeader{
    border-bottom: 1px solid;
    padding: 0;
}

.pagination{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>