<template>
  <v-container>
    <UserList />
  </v-container>
</template>

<script>
import Vue from "vue";
import UserList from "@/components/User/UserList.vue";

export default Vue.extend({
  name: "Home",

  components: {
    UserList,
  },
});
</script>
