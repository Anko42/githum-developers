<template>
  <v-container class="Home">
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

<style lang="less">
  .container{
    max-height:100%;
    height:100%;
    display: flex;
  }
</style>
