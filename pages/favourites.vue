<template>
  <div>
    <div>
      <h1 class="ml-4 mt-5 text-xl font-medium">Your Favourites 😻</h1>
    </div>
    <div
      class="flex flex-row flex-wrap mt-5 ml-4 w-2/3"
      v-if="favouritesLoaded"
    >
      <div
        class="flex relative"
        v-for="image in paginatedImages"
        :key="image.id"
      >
        <FavouriteCard :image="image" />
      </div>
    </div>
    <div class="flex mt-5 ml-4 w-2/3" v-else>
      <Spinner />
    </div>
    <div class="flex flex-row mt-5 ml-4">
      <button
        v-if="currentPage !== 0"
        class="
          rounded
          relative
          mr-5
          inline-flex
          group
          items-center
          justify-center
          px-2.5
          py-1.5
          cursor-pointer
          border-b-4 border-l-2
          shadow-lg
          bg-gradient-to-tr
          from-red-400
          to-red-300
          border-red-500
          text-white
        "
        @click="prevPage"
      >
        <ChevronLeft />
        Previous page
      </button>
      <button
        v-if="isNextPageAvailable"
        class="
          rounded
          relative
          inline-flex
          group
          items-center
          justify-center
          px-2.5
          py-1.5
          cursor-pointer
          border-b-4 border-l-2
          shadow-lg
          bg-gradient-to-tr
          from-red-400
          to-red-300
          border-red-500
          text-white
        "
        @click="nextPage"
      >
        Next page
        <ChevronRight />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { StoreActions } from '~/store';
import Image from '~/types/Image';

export default Vue.extend({
  name: 'Favourites',
  data: () => ({
    currentPage: 0,
    pageSize: 8,
  }),
  head: () => ({
    title: 'Favourites',
  }),
  methods: {
    async fetchFavouriteImages() {
      await this.$store.dispatch(
        StoreActions.FetchFavourites,
        this.currentPage
      );
    },
    async nextPage() {
      this.currentPage += 1;
    },
    async prevPage() {
      this.currentPage -= 1;
    },
  },
  computed: {
    ...mapGetters({
      favouriteImages: 'favouriteImages',
      favouritesLoaded: 'favouritesLoaded',
    }),
    paginatedImages(): Array<Image> {
      return this.favouriteImages.slice(
        this.currentPage * this.pageSize,
        (this.currentPage + 1) * this.pageSize
      );
    },
    isNextPageAvailable(): boolean {
      return this.favouriteImages.slice(
        (this.currentPage + 1) * (this.pageSize - 1)
      );
    },
  },
  async fetch(context) {
    if (!context.store.getters.favourites.length) {
      await context.store.dispatch(StoreActions.FetchFavourites, 0);
    }
  },
});
</script>
