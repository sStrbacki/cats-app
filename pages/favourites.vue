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
        v-for="image in favouriteImages"
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
        class="rounded relative mr-5 inline-flex group items-center justify-center px-2.5 py-1.5 cursor-pointer border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-red-400 to-red-300 border-red-500 text-white"
        @click="prevPage"
      >
        <svg style="width: 24px; height: 24px" class="mt-1" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z"
          />
        </svg>
        Previous page
      </button>
      <button
        v-if="isNextPageOfFavouritesAvailable"
        class="rounded relative inline-flex group items-center justify-center px-2.5 py-1.5 cursor-pointer border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-red-400 to-red-300 border-red-500 text-white"
        @click="nextPage"
      >
        Next page
        <svg style="width: 24px; height: 24px" class="mt-1" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { StoreActions } from '~/store';

export default Vue.extend({
  name: 'Favourites',
  data: () => ({
    currentPage: 0,
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
      await this.fetchFavouriteImages();
    },
    async prevPage() {
      this.currentPage -= 1;
      await this.fetchFavouriteImages();
    },
  },
  computed: {
    ...mapGetters({
      favouriteImages: 'favouriteImages',
      favouritesLoaded: 'favouritesLoaded',
      isNextPageOfFavouritesAvailable: 'isNextPageOfFavouritesAvailable',
    }),
  },
  async fetch(context) {
    if (!context.store.getters.favourites.length) {
      await context.store.dispatch(StoreActions.FetchFavourites, 0);
    }
  },
});
</script>
