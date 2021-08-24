<template>
  <v-card
    class="UserList"
    :loading="loading"
    :disabled="loading"
    :class="{ mobile: is_mobile, 'mobile-xs': is_mobile_xs }"
  >
    <v-card-title class="UserListHeader">
      <v-row>
        <v-col cols="12" md="3"><UserFilter /></v-col>
        <v-col cols="4" v-if="!is_mobile">Login</v-col>
        <v-col cols="2" v-if="!is_mobile"> Repos count</v-col>
        <v-col cols="3" v-if="!is_mobile"> Followers count </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="px-0">
      <UserListItem
        v-for="(user, index) in users"
        :key="`UserListItem-${index}`"
        :user="user"
      />
    </v-card-text>
    <v-card-actions class="pagination">
      <v-pagination
        total-visible="5"
        v-model="page"
        :length="length"
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import UserListItem from "./UserListItem.vue";
import UserFilter from "./UserFilter.vue";

export default Vue.extend({
  name: "UserList",
  components: {
    UserListItem,
    UserFilter,
  },
  mounted() {
    //this.fetchUsers();
  },
  computed: {
    ...mapGetters([
      "GET_USERS",
      "IS_LOADING",
      "GET_FILTER_PAGE",
      "GET_USERS_TOTAL_COUNT",
      "GET_FILTER_PER_PAGE",
    ]),
    loading() {
      return this.IS_LOADING;
    },
    length() {
      return ~~(this.GET_USERS_TOTAL_COUNT / this.GET_FILTER_PER_PAGE);
    },
    is_mobile() {
      const { $vuetify } = this;
      return $vuetify.breakpoint.sm || $vuetify.breakpoint.xs;
    },
    is_mobile_xs() {
      const { $vuetify } = this;
      return $vuetify.breakpoint.xs;
    },
    page: {
      get: function () {
        return this.GET_FILTER_PAGE;
      },
      set: function (value) {
        this.SET_FILTER_PAGE(value);
      },
    },
    users() {
      return this.GET_USERS;
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    ...mapMutations(["SET_FILTER_PAGE"]),
  },
  watch: {
    page: {
      immediate: false,
      handler: function () {
        this.fetchUsers();
      },
    },
  },
});
</script>

<style lang="less">
.UserList {
  display: flex;
  flex-direction: column;
  .v-card__title,
  .v-card__actions {
    flex: 0;
  }
  .v-card__text {
    flex: 1;
  }
  .v-card__actions {
    margin-top: auto;
  }

  .v-cart__text {
    padding: 0 !important;
  }
}
.UserListHeader {
  border-bottom: 1px solid;
  padding: 0;
}

.pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-sm {
}
.mobile-xs {
}
</style>
