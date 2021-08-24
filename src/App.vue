<template>
  <v-app :class="{'mobile-xs': mobile_xs}">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1 class="clickable" @click="$router.push({name: 'Home'})">Github developers</h1>
      </div>

      <v-spacer></v-spacer>

      <LoginAvatar />
    </v-app-bar>  

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import LoginAvatar from "@/components/Login/LoginAvatar.vue"

export default Vue.extend({
  name: "App",

  components: {
    LoginAvatar
  },

  data: () => ({
    showLoginOptions: false
  }),

  computed:{
    is_mobile() {
      const { $vuetify } = this;
      return $vuetify.breakpoint.sm || $vuetify.breakpoint.xs;
    },
    mobile_xs() {
      const { $vuetify } = this;
      return $vuetify.breakpoint.xs;
    },
  }
});
</script>

<style lang="less">
.row{
  margin: 0!important;
}

.clickable{
  cursor: pointer;
}

.mobile-xs{
  h1{
    font-size: 1rem;
  }
}
</style>
