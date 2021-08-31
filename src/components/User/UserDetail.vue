<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    class="UserDetail"
    :class="{ 'mobile-xs': is_mobile_xs }"
  >
    <v-card-title>
      GitHub developer - {{ `${user.login} | ${user.fullName}` }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4">
          <v-img :src="user.avatar_url"></v-img>
        </v-col>
        <v-col cols="12" sm="8">
          <v-row>
            <v-col cols="4">Number of repos:</v-col>
            <v-col cols="8">{{ user.repos_count }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="4">Number of followers:</v-col>
            <v-col cols="8">{{ user.followers_count }}</v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          class="ReposList"
          ref="ReposList"
          :class="{ active: show_repos }"
        >
          <v-card>
            <v-card-title>
              <span>Repos</span>
              <v-icon v-if="is_mobile_xs" @click="show_repos = false"
                >mdi-close</v-icon
              >
            </v-card-title>
            <v-card-text>
              <transition-group name="fade">
                <v-row
                  v-for="(repo, index) in user.repos_list"
                  :key="`Repo-${index}`"
                >
                  <v-col cols="12">{{ repo.name }}</v-col>
                </v-row>
              </transition-group>
              <v-pagination
                v-model="repos_page"
                :length="~~(user.repos_count / per_page)"
              ></v-pagination>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="FollowersList"
          ref="FollowersList"
          :class="{ active: show_followers }"
        >
          <v-card>
            <v-card-title>
              <span>Followers</span>
              <v-icon v-if="is_mobile_xs" @click="show_followers = false"
                >mdi-close</v-icon
              >
            </v-card-title>
            <v-card-text>
              <transition-group name="fade">
                <v-row
                  v-for="(follower, index) in user.followers_list"
                  :key="`Follower-${index}`"
                  @click="showFollower(follower)"
                  class="FollowersListItem"
                >
                  <v-col cols="2"
                    ><v-img :src="follower.avatar_url"></v-img
                  ></v-col>
                  <v-col cols="10">{{ follower.login }}</v-col>
                </v-row>
              </transition-group>

              <v-pagination
                v-model="followers_page"
                :length="~~(user.followers_count / per_page)"
              ></v-pagination>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="is_mobile_xs">
      <v-btn @click="show_followers = true">Show followers</v-btn>
      <v-btn @click="show_repos = true">Show repos</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "UserDetail",
  data: () => ({
    followers_page: 1,
    repos_page: 1,
    per_page: 30,
    can_load: true,
    show_followers: false,
    show_repos: false,
  }),
  computed: {
    ...mapGetters([
      "GET_USER_DETAIL",
      "IS_LOADING",
      "GET_PROFILE",
      "IS_LOGGED_IN",
    ]),
    user() {
      if (this.isProfile) {
        return this.GET_PROFILE;
      }
      return this.GET_USER_DETAIL;
    },
    loading() {
      return this.IS_LOADING;
    },
    isProfile() {
      return this.$route.name == "Profile";
    },
    is_mobile_xs() {
      const { $vuetify } = this;
      return $vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions([
      "loadUserDetailWithReposAndFollowers",
      "loadUserRepos",
      "loadUserFollowers",
    ]),
    ...mapMutations(["SET_LOADING"]),

    async showFollower(follower) {
      this.can_load = false;
      this.$router.push({
        name: "UserDetail",
        params: { username: follower.login },
      });
      this.can_load = true;
    },
  },
  watch: {
    async ["$route.params.username"](value) {
      if (!value) {
        return;
      }
      this.SET_LOADING(true);
      this.followers_page = 1;
      this.repos_page = 1;
      this.show_followers = false;
      this.show_repos = false;
      await this.loadUserDetailWithReposAndFollowers({ login: value });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      this.SET_LOADING(false);
    },
    IS_LOGGED_IN: {
      handler: function (value) {
        if (this.isProfile && !value) {
          this.$router.push({
            name: "Home",
          });
        }
      },
    },
    followers_page: {
      immediate: false,
      handler: async function (value) {
        if (this.can_load) {
          this.SET_LOADING(true)
          await this.loadUserFollowers(value);
          this.$refs.FollowersList.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          this.SET_LOADING(false)
        }
      },
    },
    repos_page: {
      immediate: false,
      handler: async function (value) {
        if (this.can_load) {
          this.SET_LOADING(true)
          await this.loadUserRepos(value);
          this.$refs.ReposList.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          this.SET_LOADING(false)
        }
      },
    },
  },
});
</script>

<style lang="less">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

* {
  scroll-behavior: smooth;
}

.UserDetail {
  flex: 1;

  .FollowersListItem{
    &:hover{
      background-color: #ccc;
      cursor: pointer;
    }
  }
  &.mobile-xs {
    .v-card__text {
      padding-bottom: 0 !important;
    }

    .ReposList,
    .FollowersList {
      position: absolute;
      transform: translateX(100%);
      transition: all 0.5s;
      height: calc(100vh - 64px);
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      overflow: scroll;

      .v-card__title {
        display: flex;
        justify-content: space-between;
      }
    }

    .ReposList.active {
      transform: translateX(0%);
    }

    .FollowersList.active {
      transform: translateX(0%);
    }
  }
}
</style>
