<script lang="ts" setup>
import { computed, ref, onMounted, watchEffect } from 'vue'
import { useGlobalStore } from '../../stores/global'
import { usePlayerStore } from '../../stores/player'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

import MusicItem from './MusicItem.vue'
import { PhHeadphones } from "@phosphor-icons/vue"

// initialise state stores.
const playerStore = usePlayerStore()
const globalStore = useGlobalStore()

const playlist = computed(() => {
  // Check if the user has chosen to view only the favorite playlist
  if (globalStore.favouritesFilter) {
    // Filter the playlist to include only files that are in the favorites array
    return playerStore.playlist.filter((file) => globalStore.favouritesList.includes(file.name))
  } 
  
  // Check if the user has entered a search query
  else if (globalStore.searchPlaylist) {
    // Filter the playlist to include files whose names contain the search query (case-insensitive)
    const searchQuery = globalStore.searchPlaylist.toLowerCase()
    return playerStore.playlist.filter((file) => file.name.toLowerCase().includes(searchQuery) || file.artist.toLowerCase().includes(searchQuery))
  }
  
  // Return the full playlist if no filters are active
  else {
    return playerStore.playlist
  }
})


// Initialize v-auto-animate helpers and store references
const [parent, enable] = useAutoAnimate()

// Watch for changes in the application state
watchEffect(() => {
  // Check if new files are currently being loaded into the playlist
  if (!playerStore.audioListLoading) {
    // If no files are being loaded, enable animations for the playlist
    enable(true)
  } else {
    // If files are being loaded, disable animations to ensure better performance
    enable(false)
  }
})


onMounted(() => {
  // Retrieve the favorite playlist from local storage
  const favStorage = localStorage.getItem('favourites')
  
  // If it exists in storage, parse it as an array; otherwise, initialize as an empty array
  let favourites = favStorage ? JSON.parse(favStorage) : []
  
  // Assign the parsed or initialized array to state for global access
  globalStore.favouritesList = favourites
})
</script>

<template>
  <div class="grow overflow-y-auto" ref="parent">
    
    <!--When no files in playlist-->
    <div
        v-if="!playerStore.playlist.length"
        class="text-[--text-color] text-center text-sm mt-10"
      >
        <PhHeadphones weight="fill" class="text-[7rem] text-white/10 w-fit mx-auto" />
        No tracks in playlist.
    </div>
    
    <MusicItem
      v-else
      v-for="file in playlist"
      :key="file.name"
      :file="file"
    />
    
  </div>
</template>