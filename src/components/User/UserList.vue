<template>
  <v-card class="UserList" :loading="loading" :disabled="loading">
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
    <v-card-actions class="pagination">
      <v-pagination v-model="page" :length="length"></v-pagination>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
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
    ...mapGetters(["GET_USERS", "IS_LOADING", "GET_FILTER_PAGE", "GET_USERS_TOTAL_COUNT","GET_FILTER_PER_PAGE"]),
    loading() {
      return this.IS_LOADING;
    },
    length() {
      return ~~(this.GET_USERS_TOTAL_COUNT / this.GET_FILTER_PER_PAGE);
    },
    page: {
      get: function(){
        return this.GET_FILTER_PAGE
      },
      set: function(value){
        this.SET_FILTER_PAGE(value)
      } 
    },

    users() {
      return this.GET_USERS;
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    ...mapMutations(["SET_FILTER_PAGE"]),
  },
  watch:{
    page: {
      immediate: false,
      handler: function(value){
        this.fetchUsers();
      }
    }
  }
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