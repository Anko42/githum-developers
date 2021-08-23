<template>
  <div class="UserFilter">
    <v-text-field
      dense
      hide-details
      v-model="location"
      @change="loadUsers"
    ></v-text-field>
    <v-select
      dense
      hide-details
      v-model="filter"
      item-text="name"
      return-object
      :items="options"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "UserFilter",
  data: () => ({
    filter: {
      name: "repositories asc",
      value: {
        sort: "repositories", // repositories / followers / joined,
        order: "asc",
      },
    },
    options: [],
  }),

  mounted() {
    const sorts = ["repositories", "followers", "joined"];
    const orders = ["asc", "desc"];

    sorts.map((sort) => {
      orders.map((order) => {
        this.options.push({
          name: `${sort} ${order}`,
          value: {
            sort: sort,
            order: order,
          },
        });
      });
    });
  },
  computed: {
    ...mapGetters([
      "GET_USERS",
      "IS_LOADING",
      "GET_FILTER_PAGE",
      "GET_FILTER_PER_PAGE",
      "GET_FILTER_LOCATION",
    ]),
    loading() {
      return this.IS_LOADING;
    },

    location: {
      get: function () {
        return this.GET_FILTER_LOCATION;
      },
      set: function (value) {
        this.SET_FILTER_LOCATION(value);
      },
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    ...mapMutations(["SET_FILTER_PAGE", "SET_FILTER_LOCATION", "SET_FILTER"]),

    loadUsers() {
      this.fetchUsers();
    },
  },
  watch: {
    filter: {
      immediate: false,
      handler: function (filter) {
        this.SET_FILTER(filter.value);
        this.loadUsers();
      },
    },
  },
});
</script>

<style lang="less">
.UserList {
  .v-cart__text {
    padding: 0 !important;
  }
}
.UserListHeader {
  border-bottom: 1px solid;
  padding: 0;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.UserFilter {
  display: flex;
  .v-input {
    margin-right: 5px;
  }
}
</style>
