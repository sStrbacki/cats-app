<template>
  <div>
    <div class="flex flex-col">
      <div class="w-1/3">
        <label
          for="categories"
          class="block mb-2 text-sm font-medium text-gray-600 px-4 pt-4"
          >Select a breed</label
        >
        <select
          id="categories"
          class="bg-gray-50 ml-4 border shadow-md opacity-90 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="selectedBreedId"
        >
          <option selected :value="null">Choose a category</option>
          <option v-for="breed in breeds" :key="breed.id" :value="breed.id">
            {{ breed.name }}
          </option>
        </select>
      </div>
      <div>
        <div
          class="w-1/3 bg-white rounded-lg border border-gray-200 mt-5 ml-4 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <img
            v-if="selectedBreed.image.url"
            class="rounded-t-lg object-cover w-full h-96"
            :src="selectedBreed.image.url"
            alt=""
          />
          <div class="p-5">
            <a href="#">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {{ selectedBreed.name }}
              </h5>
            </a>
            <p class="mb-3 italic text-gray-500 dark:text-gray-400">
              {{ selectedBreed.temperament }}
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ selectedBreed.description }}
            </p>
            <li class="flex space-x-3 mt-2">
              <svg
                class="flex-shrink-0 w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 24H0V0h24v24z" fill="none" />
                <circle cx="12" cy="12" r="8" />
              </svg>
              <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >Originating from {{ selectedBreed.origin }}</span
              >
            </li>
            <li class="flex space-x-3 mt-2">
              <svg
                class="flex-shrink-0 w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 24H0V0h24v24z" fill="none" />
                <circle cx="12" cy="12" r="8" />
              </svg>
              <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{{ selectedBreed.weight.metric }} kilograms</span
              >
            </li>
            <li class="flex space-x-3 mt-2">
              <svg
                class="flex-shrink-0 w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 24H0V0h24v24z" fill="none" />
                <circle cx="12" cy="12" r="8" />
              </svg>
              <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{{ selectedBreed.life_span }} years (average life span)</span
              >
            </li>
            <a
              :href="selectedBreed.wikipedia_url"
              target="blank"
              class="inline-flex items-center py-2 px-3 mt-4 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500"
            >
              Read more
              <svg
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { StoreActions } from '~/store';
import Breed from '~/types/Breed';
export default Vue.extend({
  head: () => ({
    title: 'Breeds',
  }),
  data() {
    return {
      selectedBreedId: null as string | null,
    };
  },
  name: 'Breeds',
  async fetch() {
    if (!this.breeds.length)
      await this.$store.dispatch(StoreActions.FetchBreeds);
    this.selectedBreedId = this.breeds[0].id;
  },
  computed: {
    ...mapGetters({
      breeds: 'breeds',
    }),
    selectedBreed(): Breed {
      return this.breeds.find(
        (breed: Breed) => breed.id === this.selectedBreedId
      );
    },
  },
});
</script>
