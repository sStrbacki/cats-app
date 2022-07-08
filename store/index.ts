import { GetterTree, ActionTree, MutationTree } from 'vuex';
import Category from '~/types/Category';
import Image from '~/types/Image';
import Breed from '~/types/Breed';

export enum StoreMutations {
  SetImages = 'SET_IMAGES',
  ClearImages = 'CLEAR_IMAGES',
  SetCategories = 'SET_CATEGORIES',
  SetSelectedCategory = 'SET_SELECTED_CATEGORY',
  SetBreeds = 'SET_BREEDS',
  SetSelectedBreed = 'SET_SELECTED_BREED',
  ToggleImagesLoaded = 'TOGGLE_IMAGES_LOADED',
}

export enum StoreActions {
  FetchImages = 'fetchImages',
  SearchImages = 'searchImages',
  ClearImages = 'clearImages',
  ToggleImagesLoaded = 'toggleImagesLoaded',
  FetchCategories = 'fetchCategories',
  FetchBreeds = 'fetchBreeds',
}

export const state = () => ({
  images: [] as Array<Image>,
  imagesLoaded: true,
  categories: [] as Array<Category>,
  selectedCategoryId: null as null | number,
  selectedBreedId: null as null | string,
  breeds: [] as Array<Breed>,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  images: (state: RootState) => state.images,
  imagesLoaded: (state: RootState) => state.imagesLoaded,
  categories: (state: RootState) => state.categories,
  selectedCategoryId: (state: RootState) => state.selectedCategoryId,
  breeds: (state: RootState) => state.breeds,
  selectedBreedId: (state: RootState) => state.selectedBreedId,
};

export const mutations: MutationTree<RootState> = {
  [StoreMutations.SetImages]: (state: RootState, images: Array<Image>) =>
    (state.images = images),
  [StoreMutations.ClearImages]: (state: RootState, images: Array<Image>) =>
    (state.images = []),
  [StoreMutations.ToggleImagesLoaded]: (state: RootState) =>
    (state.imagesLoaded = !state.imagesLoaded),
  [StoreMutations.SetCategories]: (
    state: RootState,
    categories: Array<Category>
  ) => (state.categories = categories),
  [StoreMutations.SetSelectedCategory]: (
    state: RootState,
    categoryId: number
  ) => (state.selectedCategoryId = categoryId),
  [StoreMutations.SetBreeds]: (state: RootState, breeds: Array<Breed>) =>
    (state.breeds = breeds),
  [StoreMutations.SetSelectedBreed]: (state: RootState, breedId: string) =>
    (state.selectedBreedId = breedId),
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchImages({ commit }) {
    if (process.client) commit(StoreMutations.ToggleImagesLoaded);
    const images: Array<Image> = (await this.$api.$get(
      '/v1/images/search?mime_types=jpg,png&limit=8'
    )) as Array<Image>;
    if (process.client) commit(StoreMutations.ToggleImagesLoaded);
    commit(StoreMutations.SetImages, images);
  },
  async searchImages(context) {
    context.commit(StoreMutations.ToggleImagesLoaded);
    const breedQuery =
      context.getters.selectedBreedId === null
        ? ''
        : `&breed_ids=${context.getters.selectedBreedId}`;
    const categoryQuery =
      context.getters.selectedCategoryId === null
        ? ''
        : `&category_ids=${context.getters.selectedCategoryId}`;
    const images: Array<Image> = (await this.$api.$get(
      `/v1/images/search?mime_types=jpg,png&limit=8${breedQuery}${categoryQuery}`
    )) as Array<Image>;
    context.commit(StoreMutations.SetImages, images);
    context.commit(StoreMutations.ToggleImagesLoaded);
  },
  clearImages({ commit }) {
    commit(StoreMutations.ClearImages);
  },
  toggleImagesLoaded({ commit }) {
    commit(StoreMutations.ToggleImagesLoaded);
  },
  async fetchCategories({ commit }) {
    const categories: Array<Category> = (await this.$api.$get(
      '/v1/categories'
    )) as Array<Category>;
    commit(StoreMutations.SetCategories, categories);
  },
  async fetchBreeds({ commit }) {
    const breeds: Array<Breed> = (await this.$api.$get(
      '/v1/breeds'
    )) as Array<Breed>;
    commit(StoreMutations.SetBreeds, breeds);
  },
};
