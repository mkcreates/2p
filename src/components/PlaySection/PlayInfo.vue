<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '../../stores/player'

// Initialize the player store to manage the state related to the audio player
const playerStore = usePlayerStore()

// Create a computed property to reactively track the current track from the player store
const track = computed(() => playerStore.currentTrack)

// Create a computed property to truncate the track name if it's too long
const truncateName = computed(() => {
  // Get the current track from the player store
  const track = playerStore.currentTrack

  // Determine the name of the track, preferring the title if it exists
  const name = track.title ? track.title : track.name

  // If the name is longer than 50 characters, truncate it and add '...'
  // Otherwise, return the name as is
  return name.length > 50 ? name.substr(0, 50) + '...' : name
})
</script>

<template>
  <div
    v-if="Object.keys(playerStore.currentTrack).length"
    class="text-white/75 text-center"
  >
    <h1 class="text-lg sm:text-base">{{ truncateName }}</h1>
    <p class="text-sm sm:text-xs mb-2">{{ track.artist }}</p>
    <p class="text-sm sm:text-xs text-white/40">{{ track.album }} - {{ track.year }}</p>
  </div>
</template>