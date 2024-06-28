<script setup lang="ts">
import { usePlayerStore } from '../../stores/player'

// Initialize the player store to manage the state related to the audio player
const playerStore = usePlayerStore()
</script>

<template>
  <div class="flex items-center justify-between text-sm xs:text-xs mt-2">
    <span class="text-[--main-color]">
      {{ playerStore.audioTime.elapsedTime }}
    </span>
    
    <button class="inline-flex bg-white/20 text-white text-xs rounded-full">
      <div
        @click="playerStore.progressBar = 'waveform'"
        class="trackSwitch"
        :class="{'active': playerStore.progressBar === 'waveform'}"
      >Wave</div>
      
      <div
        @click="playerStore.progressBar = 'slider'"
        class="trackSwitch"
        :class="{'active': playerStore.progressBar === 'slider'}"
      >Slider</div>
    </button>
    
    <span class="text-[--text-color]">
      {{ playerStore.audioTime.duration }}
    </span>
  </div>
</template>

<style>
.trackSwitch {
  @apply py-0.5 px-2 rounded-full
}
.trackSwitch.active {
  @apply bg-[--main-color-dark]
}
</style>