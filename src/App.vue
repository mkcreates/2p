<script setup lang="ts">
// modules
import { onMounted } from 'vue'
import { usePlayerStore } from './stores/player'
import dropzone from './lib/dropzone'

// components
import BubbleBackground from './components/BubbleBackground.vue'
import PlaySection from './components/PlaySection.vue'
import PlaylistSection from './components/PlaylistSection.vue'
import DragFilesContainer from './components/DragFilesContainer.vue'
import FilesLoadingContainer from './components/FilesLoadingContainer.vue'

// initialise state stores.
const playerStore = usePlayerStore()

onMounted(() => {
  // Invoke module for handling files drag-n-drop on window
  // Pass state store in arg so state can be accessed in the module
  dropzone(playerStore)
  
  // Disables dragging for all elements on the page.
  document.querySelectorAll('*').forEach((element) => 
      element.setAttribute('draggable', 'false')
  )
})
</script>

<template>
  <BubbleBackground />
  
  <div class="relative z-10 h-full max-w-5xl mx-auto">
      <div class="relative md:flex w-full h-full overflow-hidden">
        
        <PlaySection />
        <PlaylistSection />

      </div>
  </div>
  
  <DragFilesContainer />
  
  <!--Show when selected files are processing-->
  <transition name="fade">
    <FilesLoadingContainer v-if="playerStore.audioListLoading" />
  </transition>
</template>

<style scoped>
/* Enter animation */
.fade-enter-active { transition: opacity 1s; }
.fade-enter-from { opacity: 0; }
.fade-enter-to { opacity: 1; }

/* Leave animation */
.fade-leave-active { transition: opacity 2s; }
.fade-leave-from { opacity: 1; }
.fade-leave-to { opacity: 0; }
</style>
