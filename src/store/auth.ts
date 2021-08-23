import { Module } from "vuex";
import { RawUser as IRawUser } from "@/types/User";
import User from "@/models/User";
import UserAPI from "@/api/user";

export const auth: Module<any, any> = {
  state: {
    is_logged: false,
    profile: <User>{},
    access_token: null,
  },
  getters: {
    GET_PROFILE: function (state) {
      return state.profile;
    },
    GET_ACCESS_TOKEN: function (state) {
      return state.access_token;
    },
    IS_LOGGED_IN: function (state) {
      return state.is_logged;
    },
  },
  mutations: {
    SET_PROFILE: function (state, user: IRawUser) {
      state.profile = new User(user);
      state.is_logged = true;
    },
    SET_ACCESS_TOKEN: function (state, token: string) {
      state.access_token = token;
    },
    SIGN_OUT: function (state) {
      state.is_logged = false;
      state.profile = <User>{};
      state.access_token = null;
    },
  },
  actions: {
    loadRelations: async function ({ commit, state }) {
      const {profile} = state;
      await UserAPI.loadUserRepositories(profile).then((repositories) => {
        profile.setReposList(repositories);
      });

      await UserAPI.loadUserFollowers(profile).then((followers) => {
        profile.setFollowersList(followers);
      });

      commit("SET_PROFILE", profile)
    },
  },
};
