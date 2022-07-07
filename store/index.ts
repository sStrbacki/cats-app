import { GetterTree, ActionTree, MutationTree } from 'vuex';
import Image from '~/types/Image';

export enum StoreMutations {
  SetImages = 'SET_IMAGES',
}

export const state = () => ({
  images: [] as Array<Image>,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  images: (state: RootState) => state.images,
};

export const mutations: MutationTree<RootState> = {
  [StoreMutations.SetImages]: (state: RootState, images: Array<Image>) =>
    (state.images = images),
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchImages({ commit }) {
    const images: Array<Image> = (await this.$api.$get(
      '/v1/images/search?limit=5'
    )) as Array<Image>;
    commit(StoreMutations.SetImages, images);
  },
};
