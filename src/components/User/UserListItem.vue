<template>
<v-row></v-row>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "UserListItem",
  props:{
    user: {
      required: true,
    }
  }
});
</script>
