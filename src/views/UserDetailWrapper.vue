<template>
  <v-container class="UserDetailWrapper">
    <UserDetail />
  </v-container>
</template>

<script>
import Vue from "vue";
import UserDetail from "@/components/User/UserDetail.vue"

export default Vue.extend({
  name: "UserDetailWrapper",
  components:{
    UserDetail
  }
});
</script>
