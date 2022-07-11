import { Plugin } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: NuxtAxiosInstance;
  }
}
declare module '@nuxt/types' {
  interface Vue {
    $api: NuxtAxiosInstance;
  }
  interface NuxtAppOptions {
    $api: NuxtAxiosInstance;
  }
  interface Context {
    $api: NuxtAxiosInstance;
  }
}

const axios: Plugin = ({ $axios }, inject) => {
  const api = $axios.create({
    headers: {
      common: {
        'x-api-key': '90150617-3707-413b-a52d-1db651d4678a',
      },
    },
  }) as NuxtAxiosInstance;

  api.setBaseURL('https://api.thecatapi.com');

  inject('api', api);
};

export default axios;
