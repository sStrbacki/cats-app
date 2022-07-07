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
    </div>
    <div class="flex flex-row flex-wrap mt-5 ml-4 w-2/3">
      <img
        :src="image.url"
        v-for="image in images"
        :key="image.id"
        class="w-64 h-64 shadow-md bg-auto rounded hover:rounded-md mr-4 mb-4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { StoreActions } from '~/store/index';

export default Vue.extend({
  name: 'Explore',
  data: () => ({
    selectedCategoryId: null as null | number,
    selectedBreedId: null as null | string,
  }),
  head: () => ({
    title: 'Explore',
  }),
  methods: {
    searchImages() {
      if (!this.selectedCategoryId && !this.selectedBreedId) return;
      this.$store.dispatch(StoreActions.searchImages, {
        categoryId: this.selectedCategoryId,
        breedId: this.selectedBreedId,
      });
    },
  },
  computed: {
    ...mapGetters({
      images: 'images',
      categories: 'categories',
      breeds: 'breeds',
    }),
  },
  beforeRouteLeave(to, from, next) {
    //this.$store.dispatch(StoreActions.clearImages);
    next();
  },
  async fetch() {
    if (!this.images.length) this.$store.dispatch(StoreActions.fetchImages);
    if (!this.categories.length) this.$store.dispatch(StoreActions.fetchCategories);
    if (!this.breeds.length) this.$store.dispatch(StoreActions.fetchBreeds);
  },
});
</script>
