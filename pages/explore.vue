<template>
  <div>
    <div class="flex flex-row">
      <div>
        <label
          for="categories"
          class="block mb-2 text-sm font-medium text-gray-600 px-4 pt-4"
          >Select a category</label
        >
        <select
          id="categories"
          class="bg-gray-50 ml-4 border shadow-md opacity-90 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="selectedCategoryId"
          @change="searchImages"
        >
          <option selected :value="null">Choose a category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="ml-5">
        <label
          for="breeds"
          class="block mb-2 text-sm font-medium text-gray-600 px-4 pt-4"
          >Select a breed</label
        >
        <select
          id="breeds"
          class="bg-gray-50 ml-4 border shadow-md opacity-90 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="selectedBreedId"
          @change="searchImages"
        >
          <option selected :value="null">Choose a breed</option>
          <option v-for="breed in breeds" :key="breed.id" :value="breed.id">
            {{ breed.name }}
          </option>
        </select>
      </div>
      <div>
        <button
          class="rounded relative inline-flex group items-center justify-center px-3.5 py-1.5 ml-8 mt-11 cursor-pointer border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-red-400 to-red-300 border-red-500 text-white"
          @click="reloadImages"
        >
          Reload
        </button>
      </div>
    </div>
    <div
      class="flex w-1/5 mt-10 align-center justify-center"
      v-if="!imagesLoaded"
    >
      <Spinner />
    </div>
    <div
      class="flex flex-row flex-wrap mt-5 ml-4 w-2/3"
      v-if="imagesLoaded && images.length"
    >
      <div class="flex relative" v-for="image in images" :key="image.id">
        <ImageCard :image="image" :favDisabled="isImageFavourited(image.id)" />
      </div>
    </div>
    <div v-if="imagesLoaded && images.length === 0">
      <div
        class="flex w-1/5 mt-5 align-center justify-center ml-4 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div class="flex">
          <div class="py-1">
            <svg
              class="fill-current h-6 w-6 text-red-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
              />
            </svg>
          </div>
          <div>
            <p class="font-bold">No images found 😿</p>
            <p class="text-sm">No results were found matching your selection</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { StoreActions, StoreMutations } from '~/store/index';
import Category from '~/types/Category';
import Favourite from '~/types/Favourite';
import Image from '~/types/Image';

export default Vue.extend({
  name: 'Explore',
  head: () => ({
    title: 'Explore',
  }),

  methods: {
    async searchImages(): Promise<void> {
      if (!this.selectedCategoryId && !this.selectedBreedId)
        await this.$store.dispatch(StoreActions.FetchImages);
      await this.$store.dispatch(StoreActions.SearchImages, {
        categoryId: this.selectedCategoryId,
        breedId: this.selectedBreedId,
      });
    },
    async reloadImages(): Promise<void> {
      if (!this.selectedCategoryId && !this.selectedBreedId)
        await this.$store.dispatch(StoreActions.FetchImages);
      else await this.$store.dispatch(StoreActions.SearchImages);
    },
  },
  computed: {
    ...mapGetters({
      images: 'images',
      imagesLoaded: 'imagesLoaded',
      categories: 'categories',
      breeds: 'breeds',
      favourites: 'favourites',
    }),
    selectedCategoryId: {
      get(): Category {
        return this.$store.getters.selectedCategoryId;
      },
      set(value) {
        this.$store.commit(StoreMutations.SetSelectedCategory, value);
      },
    },
    selectedBreedId: {
      get() {
        return this.$store.getters.selectedBreedId;
      },
      set(value) {
        this.$store.commit(StoreMutations.SetSelectedBreed, value);
      },
    },
    isImageFavourited() {
      return (imageId: number | string) => {
        return this.favourites.some(
          (favourite: Favourite) => favourite.image_id === imageId
        );
      };
    },
  },
  async fetch() {
    if (!this.images.length)
      await this.$store.dispatch(StoreActions.FetchImages);
    if (!this.categories.length)
      await this.$store.dispatch(StoreActions.FetchCategories);
    if (!this.breeds.length)
      await this.$store.dispatch(StoreActions.FetchBreeds);
    if (!this.favourites.length)
      await this.$store.dispatch(StoreActions.FetchFavourites);
  },
});
</script>
