import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";


Vue.config.productionTip = false;

import firebase from "firebase/app"
const firebaseConfig = {
  apiKey: "AIzaSyAJFLOiJxCgvybhMsqIxTHFPMBAn51EFwI",
  authDomain: "garwan-github-devs.firebaseapp.com",
  projectId: "garwan-github-devs",
  storageBucket: "garwan-github-devs.appspot.com",
  messagingSenderId: "717087298406",
  appId: "1:717087298406:web:9e971c5c53bca564822ea7"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
