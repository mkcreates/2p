<script lang="ts" setup>
// modules
import { usePlayerStore } from '../../stores/player'
import { useGlobalStore } from '../../stores/global'
import handleFiles from '../../lib/handleFiles'

// components
import { PhPlus, PhPlaylist } from "@phosphor-icons/vue"

// initialise state stores.
const playerStore = usePlayerStore()
const globalStore = useGlobalStore()

// When add music button is clicked. Manually click input:file to open file select
const addMusic = () => document.getElementById('selectAudio').click()

// When audio is selected.
const filesSelectd = (e) => {
    // Retrieve selected files from the event object
    const files = e.target.files

    // Then pass files to handleFiles method
    // Pass state store in second arg so state can be accessed in the module
    handleFiles(files, playerStore)
}
</script>

<template>
  <div class="flex justify-between items-center px-4 pb-3">
  
    <img src="../../assets/img/logo.svg" class="w-8" />

    <div class="flex justify-center items-center">
      <button
        @click="addMusic()"
        class="flex items-center justify-center bg-black/20 text-white/75 text-sm sm:text-xs px-3 py-2 rounded-full"
        >
        <PhPlus class="mr-1" /> Add Music
        <input type="file" @change="filesSelectd" id="selectAudio" class="hidden" accept="audio/*" multiple>
      </button>

      <button
        @click="playerStore.playlistToggle = true"
        class="circBtn md:hidden ml-3"
      >
        <PhPlaylist />
      </button>
    </div>
      
  </div>
</template>

<style>
.circBtn {
  @apply flex items-center justify-center p-2 bg-black/30 text-lg sm:text-base text-white/75 rounded-full duration-300 active:scale-125
}
.circBtn.active {
  @apply bg-[#FF92F8] text-white
}
</style>