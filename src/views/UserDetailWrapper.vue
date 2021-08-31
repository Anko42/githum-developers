<template>
  <v-container class="UserDetailWrapper" :class="{'mobile-xs': is_mobile_xs}">
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
  },

  computed:{
    is_mobile_xs() {
      const { $vuetify } = this;
      return $vuetify.breakpoint.xs;
    },
  }
});
</script>

<style lang="less">
  .UserDetailWrapper {
    &.mobile-xs{
      overflow: hidden;
    }
  }
</style>