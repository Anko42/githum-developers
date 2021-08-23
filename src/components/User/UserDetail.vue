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
            <v-col cols="8">{{user.repos_count}}</v-col>
          </v-row>
                    <v-row>
            <v-col cols="4">Number of followers:</v-col>
            <v-col cols="8">{{user.followers_count}}</v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "UserDetail",
  computed:{
    ...mapGetters(['GET_USER_DETAIL',"IS_LOADING"]),
    user(){
      return this.GET_USER_DETAIL
    },
    loading(){
      return this.IS_LOADING
    }
  }
});
</script>
