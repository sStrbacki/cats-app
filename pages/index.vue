<template>
  <div class="mx-auto h-screen flex flex-row">
    <div class="w-2/5 flex flex-col justify-start align-center mt-64">
      <div class="flex justify-center">
        <div class="text-5xl text-gray-500 font-serif">CAT SHOW</div>
      </div>
      <div class="flex justify-center">
        <p class="w-2/3 mt-5 text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis,
          explicabo facere aut iste beatae ut, iusto tenetur officiis possimus
          exercitationem, corporis mollitia dignissimos vel eveniet corrupti.
          Veritatis quod quidem eos.
        </p>
      </div>
      <div class="flex justify-center mt-4">
        <NuxtLink
          class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-red-400 to-red-300 border-red-500 text-white"
          to="/explore"
          >See more</NuxtLink
        >
      </div>
    </div>
    <div class="w-3/5 flex align-center justify-center">
      <img src="/hero.jpg" alt="Hero image" class="object-cover" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
});
</script>
