import { Module } from "vuex";

import User from "@/models/User";
import UserAPI from "@/api/user";

export const user: Module<any, any> = {
  state: {
    users: <User[]>[],
    detail: <User>{},
    loading: false,
    filter: {
      location: "Bratislava",
      page: 1,
      per_page: 4,
      sort: "repositories", // repositories / followers / joined,
      order: "desc",
    },
  },
  getters: {
    GET_USERS: function (state) {
      return state.users;
    },
    GET_USER_DETAIL: function (state) {
      return state.detail;
    },
    IS_LOADING: function (state) {
      return state.loading;
    },
  },
  mutations: {
    SET_USERS: function (state, users: User[]) {
      state.users = users;
    },
    SET_DETAIL: function (state, user: User) {
      state.detail = user;
    },
    SET_LOADING: function (state, status: boolean) {
      state.loading = status;
    },
  },
  actions: {
    fetchUsers: function ({ commit, state }) {
      UserAPI.fetchUsers(state.filter).then((user_raw_list) => {
        if (!user_raw_list) {
          console.error("Notification");
        }

        const users = <User[]>[];

        for (const user_index in user_raw_list) {
          const temp_user = new User(user_raw_list[user_index]);

          UserAPI.loadUserDetail(temp_user).then((user_detail_data) => {
            users.push(new User(user_detail_data));
          });
          commit("SET_USERS", users);
          commit("SET_LOADING", false);
        }
      });
    },
    loadUserDetail: async function ({ commit, state }, user: User) {
      commit("SET_LOADING", true);
      await UserAPI.loadUserDetail(user)
        .then((detail_raw) => {
          if (!detail_raw) {
            console.error("Notification");
          }
          const detail = new User(detail_raw);
          commit("SET_DETAIL", detail);
        })
        .finally(() => {
          commit("SET_LOADING", false);
        });
    },
    loadUserDetailWithReposAndFollowers: async function ({ commit, state }, user: User) {
      commit("SET_LOADING", true);
      await UserAPI.loadUserDetail(user)
        .then(async (detail_raw) => {     

          if (!detail_raw) {
            console.error("Notification");
          }
          const detail = new User(detail_raw);

          await UserAPI.loadUserRepositories(user).then((repositories) => {
            detail.setReposList(repositories); 
          })

          await UserAPI.loadUserFollowers(user).then((followers) => {
            detail.setFollowersList(followers); 
          })

          commit("SET_DETAIL", detail);
        })
        .finally(() => {
          commit("SET_LOADING", false);
        });
    },
    loadUserRepos: async function ({ commit, state }, page: number) {
      const detail = state.detail;
      if(!page){
        page = 1;
      }
      UserAPI.loadUserRepositories(detail, page).then((repositories) => {
        detail.setReposList(repositories); 
        commit("SET_DETAIL", detail);
      })
    },
    loadUserFollowers: async function ({ commit, state }, page: number) {
      const detail = state.detail;
      if(!page){
        page = 1;
      }
      UserAPI.loadUserRepositories(detail, page).then((repositories) => {
        detail.setReposList(repositories); 
        commit("SET_DETAIL", detail);
      })
    },
  },
};
