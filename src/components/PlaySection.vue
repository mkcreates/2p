<script setup lang="ts">
import { usePlayerStore } from '../stores/player'

// Components
import Head from './PlaySection/Head.vue'
import PlayTrack from './PlaySection/PlayTrack.vue'
import PlayInfo from './PlaySection/PlayInfo.vue'
import PlayButtons from './PlaySection/PlayButtons.vue'

// initialise global state store.
const playerStore = usePlayerStore()
</script>

<template>
  <div class="shrink-0 w-full md:w-1/2 h-full flex flex-col py-5 pb-0">
    
    <Head />

    <div class="grow overflow-y-auto px-4 py-5">
      <PlayTrack />
      
      <!--When no files in playlist-->
      <div
        v-if="!playerStore.playlist.length"
        class="text-white/75 text-center text-sm mt-5"
      >
        Drag and drop audio files onto the screen or click the 'Add Music' button above to select files.
      </div>
      
      <PlayInfo v-else />
    </div>
    
    <PlayButtons />
  </div>
</template>