<script lang="ts" setup>
import { usePlayerStore } from '../../stores/player'
import { useGlobalStore } from '../../stores/global'

import { PhArrowLeft, PhMagnifyingGlass, PhHeart, PhX } from "@phosphor-icons/vue"

// initialise state stores.
const playerStore = usePlayerStore()
const globalStore = useGlobalStore()

// When search input is typed into
const search = (value) => {
  // ASsign value to playlist search filter value in state
  globalStore.searchPlaylist = value
  // Turn off favourites playlist filter
  globalStore.favouritesFilter = false
}


// When favourite filter button is clicked
const showFavourites = (value) => {
  // If playlist is empty, exit function (do nothing)
  if (!playerStore.playlist.length) return

  // Toggle filter state
  globalStore.favouritesFilter = !globalStore.favouritesFilter
  // Turn off search filter
  globalStore.searchPlaylist = null
}
</script>

<template>
  <div class="flex items-center mb-5">
    <button
      @click="playerStore.playlistToggle = false"
      class="circBtn md-hidden mr-3"
    >
      <PhArrowLeft />
    </button>

    <div class="grow flex items-center text-[--text-color]">
      <PhMagnifyingGlass class="text-base mr-3" />
      <input
        @input="search(globalStore.searchPlaylist)"
        v-model="globalStore.searchPlaylist"
        type="text"
        class="w-full bg-transparent text-sm xs:text-xs"
        placeholder="Search for title or artist.."
      >

      <PhX
        v-if="globalStore.searchPlaylist"
        @click="globalStore.searchPlaylist = null"
        class="text-lg mr-3 cursor-pointer"
      />
    </div>

    <button
      @click="showFavourites()"
      class="circBtn"
      :class="{'active': globalStore.favouritesFilter}"
    >
      <PhHeart />
    </button>
  </div>
</template>