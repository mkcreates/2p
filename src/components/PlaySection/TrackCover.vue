<script setup lang="ts">
import { usePlayerStore } from '../../stores/player'

// Initialize the player store to manage the state related to the audio player
const playerStore = usePlayerStore()

const img = `bg-[url(${playerStore.currentTrack.cover})]`
</script>

<template>
  <div class="w-[75%] xs:w-[40%] sm:w-[50%] bg-black/20 aspect-square mx-auto rounded-2xl mb-5">
    <div class="flex items-center justify-center h-full bg-[url(../img/track-bg.svg)] bg-cover bg-center">
      <div class="w-[80%] h-fit border border-white/10 rounded-full">
        <img
          v-if="playerStore.currentTrack.cover"
          :src="playerStore.currentTrack.cover" class="trackcover opacity-90"
          :class="{'spin-animation': playerStore.isPlaying}"
        />
        <img
          v-else
          src="../../assets/img/logo.svg" class="trackcover grayscale opacity-20"
          :class="{'spin-animation': playerStore.isPlaying}"
        />
      </div>
    </div>
  </div>
</template>

<style>
.trackcover {
  @apply w-full aspect-square object-cover object-center rounded-full duration-700
}
.spin-animation {
  @apply animate-[spin_16s_linear_infinite]
}
</style>