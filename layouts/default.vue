<template>
  <div>
    <NavBar />
    <transition name="default" mode="out-in">
      <Nuxt />
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
})
</script>
