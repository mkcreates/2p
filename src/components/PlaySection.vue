<script setup lang="ts">
// Modules
import { usePlayerStore } from '../stores/player'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

// Components
import Head from './PlaySection/Head.vue'
import PlayTrack from './PlaySection/PlayTrack.vue'
import PlayInfo from './PlaySection/PlayInfo.vue'
import PlayButtons from './PlaySection/PlayButtons.vue'
import ControlNotice from './PlaySection/ControlNotice.vue'
import AboutTheApp from './AboutTheApp.vue'

// initialise global state store.
const playerStore = usePlayerStore()
</script>

<template>
  <div class="shrink-0 w-full md:w-1/2 h-full flex flex-col py-5 pb-0 selection:bg-neutral-800">
    
    <Head />

    <div class="grow overflow-y-auto px-4 py-5 overflow-x-hidden" v-auto-animate>
      <PlayTrack v-if="playerStore.playlist.length" />

      <AboutTheApp v-else />
      
      <!--When no files in playlist-->
      <div
        v-if="!playerStore.playlist.length"
        class="text-[--text-color] text-center text-sm mt-5"
      >
        Drag and drop audio files onto the screen or click the 'Add Music' button above to select files.

        <ControlNotice />
      </div>
      
      <PlayInfo v-else />
    </div>

    <PlayButtons />
  </div>
</template>