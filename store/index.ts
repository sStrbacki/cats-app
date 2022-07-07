import { GetterTree, ActionTree, MutationTree } from 'vuex';
import Category from '~/types/Category';
import Image from '~/types/Image';
import Breed from '~/types/Breed';

export enum StoreMutations {
  SetImages = 'SET_IMAGES',
  ClearImages = 'clearImages',
  SetCategories = 'SET_CATEGORIES',
  SetBreeds = 'SET_BREEDS',
}

export enum StoreActions {
  fetchImages = 'fetchImages',
  searchImages = 'searchImages',
  clearImages = 'clearImages',
  fetchCategories = 'fetchCategories',
  fetchBreeds = 'fetchBreeds',
}

export const state = () => ({
  images: [] as Array<Image>,
  categories: [] as Array<Category>,
  breeds: [] as Array<Breed>,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  images: (state: RootState) => state.images,
  categories: (state: RootState) => state.categories,
  breeds: (state: RootState) => state.breeds,
};

export const mutations: MutationTree<RootState> = {
  [StoreMutations.SetImages]: (state: RootState, images: Array<Image>) =>
    (state.images = images),
  [StoreMutations.ClearImages]: (state: RootState, images: Array<Image>) =>
  (state.images = []),
  [StoreMutations.SetCategories]: (
    state: RootState,
    categories: Array<Category>
  ) => (state.categories = categories),
  [StoreMutations.SetBreeds]: (state: RootState, breeds: Array<Breed>) =>
    (state.breeds = breeds),
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchImages({ commit }) {
    const images: Array<Image> = (await this.$api.$get(
      '/v1/images/search?mime_types=jpg,png&limit=8'
    )) as Array<Image>;
    commit(StoreMutations.SetImages, images);
  },
  async searchImages({ commit }, { categoryId, breedId }) {
    const breedQuery = breedId === null ? '' : `&breed_ids=${breedId}`;
    const categoryQuery = categoryId === null ? '' : `&category_ids=${categoryId}`;
    const images: Array<Image> = (await this.$api.$get(
      `/v1/images/search?mime_types=jpg,png&limit=8${breedQuery}${categoryQuery}`
    )) as Array<Image>;
    commit(StoreMutations.SetImages, images);
  },
  async clearImages({commit}){
    commit(StoreMutations.ClearImages)
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
