<template>
  <nav class="flex items-center justify-between flex-wrap bg-red-400 p-4">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <img
        class="fill-current h-8 w-8 mr-2"
        src="/favicon.ico"
        width="54"
        height="54"
      />
      <span class="font-semibold text-xl tracking-tight">Cats App</span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto mt-2">
      <div class="text-sm lg:flex-grow">
        <a
          class="block mt-4 lg:inline-block lg:mt-0 text-red-100 hover:text-white mr-4 cursor-pointer"
        >
          Docs
        </a>
        <a
          class="block mt-4 lg:inline-block lg:mt-0 text-red-100 hover:text-white mr-4 cursor-pointer"
        >
          Examples
        </a>
        <a
          class="block mt-4 lg:inline-block lg:mt-0 text-red-100 hover:text-white cursor-pointer"
        >
          Blog
        </a>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'NavBar',
})
</script>
