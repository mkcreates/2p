<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlayerStore } from '../../stores/player'
import colorPlayedPart from '../../lib/colorPlayedPart'

// Initialize the player store to manage the state related to the audio player
const playerStore = usePlayerStore()

onMounted(() => {
  // Get slider reference
  const seekSlider = document.getElementById('seekSlider')
  
  // Add an event listener to the seek slider
  seekSlider.addEventListener('input', function() {
    // If WaveSurfer (player) instance not set, exit function
    if (window.wavesurfer === undefined) return
    
      // Calculate the seek time based on the slider value
      const seekTime = window.wavesurfer.getDuration() * (this.value / 100)
  
      // Update the current playback time of the audio element
      window.wavesurfer.setTime(seekTime)
  
      // update played part of the seek slider
      colorPlayedPart(this)
  })
})
</script>

<template>
  <div v-show="playerStore.progressBar === 'slider'">
    <input type="range" min="0" max="100" value="0" class="w-full appearance-none h-[5px] bg-white/20 rounded-full mb-1" id="seekSlider">
  </div>
</template>