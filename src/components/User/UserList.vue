<template>
  <v-container>
    <UserListItem v-for="(user, index) in users" :key="`UserListItem-${index}`" :user="user" />
  </v-container>
</template>

<script>
import Vue from "vue";
import UserListItem from "./UserListItem.vue";

export default Vue.extend({
  name: "UserList",
  components: {
    UserListItem,
  },

  data: () => ({
      users: []
  })
});
</script>
