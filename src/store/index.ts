import Vue from "vue";
import Vuex from "vuex";
import {user} from "./user";
import {auth} from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: user,
    auth: auth
  },
});
