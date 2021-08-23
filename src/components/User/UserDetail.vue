<template>
  <v-card :loading="loading">
    <v-card-title>
      GitHub developer - {{ `${user.login} | ${user.fullName}` }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-img :src="user.avatar_url"></v-img>
        </v-col>
        <v-col cols="8">
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
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Repos</v-card-title>
            <v-card-text>
              <v-row
                v-for="(repo, index) in user.repos_list"
                :key="`Repo-${index}`"
              >
                <v-col cols="12">{{ repo.name }}</v-col>
              </v-row>
              <v-pagination v-model="repos_page" :length="~~(user.repos_count / per_page)"></v-pagination>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Followers</v-card-title>
            <v-card-text>
              <v-row
                v-for="(follower, index) in user.followers_list"
                :key="`Follower-${index}`"
              >
                <v-col cols="2"
                  ><v-img :src="follower.avatar_url"></v-img
                ></v-col>
                <v-col cols="10">{{ follower.login }}</v-col>
              </v-row>
              <v-pagination v-model="followers_page" :length="~~(user.followers_count / per_page)"></v-pagination>
              
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "UserDetail",
  data: () => ({
    followers_page: 1,
    repos_page: 1,
    per_page: 30,
  }),
  computed: {
    ...mapGetters(["GET_USER_DETAIL", "IS_LOADING"]),
    user() {
      return this.GET_USER_DETAIL;
    },
    loading() {
      return this.IS_LOADING;
    },
  },
  methods:{
    ...mapActions(['loadUserRepos','loadUserFollowers'])
  },
  watch:{
    followers_page: {
      immediate: false,
      handler: function(value){
        this.loadUserFollowers(value)
      }
    },
    repos_page: {
      immediate: false,
      handler: function(value){
        this.loadUserRepos(value)
      }
    }
  }
});
</script>
