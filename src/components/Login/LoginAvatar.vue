<template>
  <div class="LoginAvatar">
    <v-card class="hide-auth" :class="{ 'show-auth': showLoginOptions }">
      <section id="firebaseui-auth-container"></section>
    </v-card>

    <v-btn v-if="!isLoggedIn" text @click="showLoginOptions = true">
      <span>LOGIN WITH GitHub</span>
    </v-btn>
    <v-menu v-else bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="white">
            <v-img :src="user.avatar_url"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="white">
              <v-img :src="user.avatar_url"></v-img>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="showDetail"> DETAIL </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="signOut"> LOGOUT </v-btn>
            
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import Vue from "vue";

import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { mapGetters, mapMutations, mapActions} from "vuex";

export default Vue.extend({
  name: "LoginAvatar",

  data: () => ({
    showLoginOptions: false,
    key_loader: 0,
    ui: null,
    uiConfig: null,
  }),

  mounted() {
    this.initFirebaseOAuth();
  },
  computed: {
    ...mapGetters(["GET_PROFILE", "IS_LOGGED_IN"]),
    isLoggedIn() {
      return this.IS_LOGGED_IN;
    },
    user() {
      return this.GET_PROFILE;
    },
  },
  methods: {
    ...mapMutations(["SET_PROFILE", "SET_ACCESS_TOKEN", "SIGN_OUT"]),
    ...mapActions(["loadRelations"]),

    initFirebaseOAuth: function () {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            const { additionalUserInfo, credential } = authResult;

            if (additionalUserInfo) {
              this.SET_PROFILE(additionalUserInfo.profile);
              this.SET_ACCESS_TOKEN(credential.accessToken);
              this.loadRelations()
            }

            return false;
          },
        },
        signInSuccessUrl: "/authenticate",
        signInOptions: [
          {
            provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
          },
        ],
        signInFlow: "popup",
      };

      this.ui.start("#firebaseui-auth-container", this.uiConfig);
    },
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(
          (data) => {
            this.SIGN_OUT();
          },
          function (error) {
            console.error(error);
          }
        );
    },

    showDetail: function () {
      this.$router.push({name: 'Profile'})
    }
  },
  watch: {
    IS_LOGGED_IN: {
      handler: function (value) {
        if (value) {
          this.showLoginOptions = false;
          this.ui.reset();
          this.ui.start("#firebaseui-auth-container", this.uiConfig);
        }
      },
    },
  },
});
</script>

<style lang="less">
.row {
  margin: 0 !important;
}
.LoginAvatar {
  position: relative;
}

.hide-auth {
  opacity: 0;
  position: absolute !important;
  transform: translateY(-100%);
  z-index: 1;
  transition: all 0.3s;
}
.show-auth {
  transform: translateY(0%);
  opacity: 1;
}
</style>
