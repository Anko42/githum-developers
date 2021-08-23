<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Github developers</h1>
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

  methods:{
   
  }
});
</script>

<style lang="less">
.row{
  margin: 0!important;
}
</style>
