import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  
  // A string value that represents the search filter applied to the playlist.
  const searchPlaylist = ref<string | null>(null)
  
  // Holds all favourite tracks fetched from localStorage
  const favouritesList = ref<[]>([])
  
  // Indicates whether the playlist should be filtered to show only favourite tracks.
  const favouritesFilter = ref<boolean>(false)

  return { searchPlaylist, favouritesFilter, favouritesList }
})
