<script lang="ts" setup>
// modules
import { usePlayerStore } from '../stores/player'

// components
import Head from './PlaylistSection/Head.vue'
import MusicList from './PlaylistSection/MusicList.vue'

const playerStore = usePlayerStore()
</script>

<template>
  <div
    class="grow w-full sm:max-w-lg md:w-1/2 h-full md:block fixed z-10 top-0 right-0 md:translate-x-0 duration-500 md:static px-3 sm:px-4 py-5 shadow-sm selection:bg-neutral-900"
      :class="playerStore.playlistToggle ? 'translate-x-0' : 'translate-x-full md:translate-x-0'"
    >

    <div class="flex flex-col w-full bg-neutral-800 max-h-full min-h-[80vh] overflow-y-auto rounded-2xl p-4 sm:p-5">

      <Head />
      <MusicList />

    </div>

  </div>
</template>