<script lang="ts" setup>
import { computed, ref } from 'vue'
import { usePlayerStore } from '../../stores/player'
import { useGlobalStore } from '../../stores/global'

import { PhHeart } from "@phosphor-icons/vue"

const props = defineProps({
  file: Object
})

// initialise state stores.
const playerStore = usePlayerStore()
const globalStore = useGlobalStore()

const isInFavouriteList = computed<boolean>(() => {
  // Retrieve the 'favourites' array from store
  let favourites = globalStore.favouritesList
  
  // Check if the 'favourites' array includes the current file name
  if (favourites.includes(props.file.name)) {
    // If the file name is found in the 'favourites' array, set the reactive variable to true
    return true
  }
})

// Computed property to determine if the current track is the one being played
const isCurrentlyPlaying = computed<boolean>(() => playerStore.currentTrack.name === props.file.name)

// truncate and remove undersc
//const modifyTitle =computed<boolean>(() => )

const playAudio = (file) => {
  // If current audio is on track and player is paused
  // Continue play and then exit function
  if (isCurrentlyPlaying.value && !playerStore.isPlaying) {
    window.wavesurfer.play() // wavesurfer playet
    return
  }
  
  // On click, play audio if not currently  on track
  if (!isCurrentlyPlaying.value) {
    playerStore.play(file)
  } else {
    //  Pause when is currently on track
    window.wavesurfer.pause()
  }
}


const addFavourite = (name) => {
  // Declare a variable to store the list of favourites
  let favourites
  
  // Check if the 'favourites' key exists in localStorage
  if (localStorage.getItem('favourites') === null) {
    // If it doesn't exist, initialize favourites as an empty array
    favourites = []
  } else {
    // If it exists, parse the JSON string stored in localStorage to retrieve the array
    favourites = JSON.parse(localStorage.getItem('favourites'))
  }
  
  // Check if the file name is not already in the favourites array
  if (!favourites.includes(name)) {
    // If the file name is not in the favourites array, add it
    favourites.push(name)
    
    // Save array to reactive state
    globalStore.favouritesList = favourites
    
    // Save the updated favourites array back to localStorage as a JSON string
    localStorage.setItem('favourites', JSON.stringify(favourites))
  } else {
    // If the file name is already in the favourites array, remove it
    favourites = favourites.filter((val) => val !== name)
    
    // Save array to reactive state
    globalStore.favouritesList = favourites
    
    // Save the updated favourites array back to localStorage as a JSON string
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }
}
</script>

<template>
  <div
    @click="playAudio(file)"
    :id="file.id"
    class="flex items-center max-w-full group rounded-xl p-3 cursor-pointer duration-300"
    :class="{'bg-neutral-900 marquee': isCurrentlyPlaying}"
  >
    <img v-if="file.cover" :src="file.cover" width="45" height="45" class="listImg" />
    <img v-else src="../../assets/img/logo.svg" width="45" height="45" class="listImg" />

    <div class="grow relative text-[--text-color] overflow-x-hidden mr-2">
      <div class="mq w-fit">
        <p class="text-sm font-semibold mb-0.5 whitespace-nowrap max-w-full">
          {{ file.title ? file.title : file.name.replace(/_/g, ' ') }}
        </p>
      </div>

      <p class="flex items-center text-xs text-white/40">
          {{ file.artist }}
      </p>

      <div
        class="absolute top-0 right-0 w-10 h-full bg-gradient-to-r from-transparent duration-300"
          :class="isCurrentlyPlaying ? 'to-neutral-900' : 'to-neutral-800'"
        ></div>
    </div>

    <div @click.stop="addFavourite(file.name)">
      <PhHeart
        :weight="isInFavouriteList ? 'fill' : 'regular'"
        class="text-2xl text-[--main-color]"
      />
    </div>
  </div>
</template>

<style>
.listImg {
  @apply shrink-0 opacity-70 mr-4 rounded-full object-cover aspect-square border border-white/10
}

.marquee:hover .mq p {
  padding-left: 100%;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-170%);
  }
}
</style>