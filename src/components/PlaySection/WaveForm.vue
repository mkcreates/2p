<script setup lang="ts">
import { usePlayerStore } from '../../stores/player'

import { PhCircleNotch } from "@phosphor-icons/vue"

// Initialize the player store to manage the state related to the audio player
const playerStore = usePlayerStore()
</script>

<template>
  <div
    v-show="playerStore.progressBar === 'waveform'"
    class="mb-3"
  >
    <div
      v-show="playerStore.waveformLoading"
      class="flex items-center justify-center bg-white/5 h-[30px] w-full text-lg text-white/80"
    >
      <PhCircleNotch class="animate-spin" />
    </div>
    <div
      v-show="!playerStore.waveformLoading"
      id="waveform"
    ></div>
  </div>
</template>