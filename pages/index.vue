<template></template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
  async fetch() {
    await this.$store.dispatch('fetchImages');
  },
});
</script>
