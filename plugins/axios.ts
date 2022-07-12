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
        'x-api-key': process.env.X_API_KEY,
      },
    },
  }) as NuxtAxiosInstance;

  api.setBaseURL(process.env.API_BASE_URL as string);

  inject('api', api);
};

export default axios;
