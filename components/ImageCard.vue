<template>
  <div>
    <img
      :src="image.url"
      class="w-64 h-64 shadow-md bg-auto rounded hover:rounded-md mr-4 mb-4"
    />
    <transition name="fade">
      <div
        v-if="!favDisabled"
        class="
          w-64
          h-64
          opacity-0
          rounded
          hover:opacity-70
          duration-300
          absolute
          inset-0
          z-10
          flex
          justify-center
          items-center
          bg-gray-300
          transition
        "
      >
        <button
          type="button"
          class="w-10 h-10 rounded-full text-red-600 hover:text-red-700 grow"
          :class="{ puffOut: disabled }"
          @click="favourite"
        >
          <Heart />
        </button>
      </div>
      <div
        v-else
        class="
          w-64
          h-64
          rounded
          absolute
          inset-0
          z-10
          flex
          justify-start
          items-end
          bg-transparent
          transition
        "
      >
        <div
          class="
            bg-gray-300
            flex
            w-full
            p-2
            justify-center
            rounded-b-sm
            bg-opacity-50
          "
        >
          <button
            class="
              rounded
              relative
              inline-flex
              group
              items-center
              justify-center
              px-1.5
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
            @click="unfavorite"
          >
            Unfavorite it
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Image from '~/types/Image';

import Vue, { PropType } from 'vue';
import { StoreActions } from '~/store';
export default Vue.extend({
  name: 'ImageCard',
  props: {
    image: {
      required: true,
      type: Object as PropType<Image>,
    },
    favDisabled: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    disabled: false,
  }),
  methods: {
    async favourite(): Promise<void> {
      this.shakeDisabled();
      await this.$store.dispatch(StoreActions.PostFavourite, this.image);
    },
    shakeDisabled(): void {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1500);
    },
    async unfavorite(): Promise<void> {
      await this.$store.dispatch(StoreActions.DeleteFavourite, this.image.id);
    },
  },
});
</script>
<style scoped>
.grow {
  transition: all 0.5s ease-in-out;
}
.grow:hover {
  transform: scale(1.3);
}
.puffOut {
  animation: puffOut 2s cubic-bezier(0.165, 0.84, 0.44, 1) both;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes puffOut {
  0% {
    transform: scale(1);
    filter: blur(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    filter: blur(4px);
    opacity: 0;
  }
}
</style>
