import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import WaveSurfer from 'wavesurfer.js'
import formatAudioTime from '../lib/formatAudioTime'
import colorPlayedPart from '../lib/colorPlayedPart'

interface Playlist {
  playlist: Array<{
    name: string,
    fileURL: string,
    title: string | null,
    artist: string,
    album: string,
    year: string,
    cover: string | null,
  }>
}

export const usePlayerStore = defineStore('player', () => {
  // An array that holds all the audio tracks in the playlist.
  const playlist: Playlist = ref<[]>([])
  
  // Indicates whether the playlist tab is open or not.
  const playlistToggle = ref<boolean>(false)
  
  // Stores the currently playing audio object
  const currentTrack = ref<object>({})
  
  // Indicates whether audio files are being processed after selection
  const audioListLoading = ref<boolean>(false)
  
  // Indicates whether an audio is currently playing
  const isPlaying = ref<boolean>(false)
  
  // Indicates whether player is paused
  const isPaused = ref<boolean>(false)
  
  // Indicates whether the currently playing audio will loop
  const toRepeat = ref<boolean>(false)
  
  // Indicates whether the selected audio files will shuffle to the next track
  const toOrder = ref<boolean>(true)
  
  // Indicates whether the audio waveform is currently loading
  const waveformLoading = ref<boolean>(false)
  
  // Indicates the type of progress bar to display: 'waveform' or 'slider'.
  const progressBar = ref<'waveform' | 'slider'>('waveform')
  
  // Stores the duration and elapsed time of the playing audio
  const audioTime = ref<{ duration: string, elapsedTime: string }>({
    duration: '0:00',
    elapsedTime: '0:00'
  })

  
  
  // Declare a global variable to hold the WaveSurfer instance
  //window.wavesurfer
  
  const play = (file) => {
    // update data of song currently playing with payload
    currentTrack.value = file
    
    waveformLoading.value = true
    
    // Check if the WaveSurfer instance already exists
    if (window.wavesurfer) {
      // Destroy the existing instance
      window.wavesurfer.destroy()
    }
    
    // Start new instance
    // Get references to the audio element
    window.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgba(255, 255, 255, 0.75)',
      progressColor: 'rgb(255, 146, 248)',
      url: file.fileURL,
      autoplay: true,
      barWidth: 2.5,
      height: 30,
      barGap: 4,
      dragToSeek: true,
    })
    
    
    /* Handle all player events */

    // When the audio is both decoded and can play
    window.wavesurfer.on('ready', (percent) => {
      // Set state for indicating the audio waveform is loaded
      waveformLoading.value = false
    })
    
    
    // When the audio starts playing
    window.wavesurfer.on('play', () => {
      isPlaying.value = true
      isPaused.value = false
      
      // Get the total duration of the audio in seconds from the WaveSurfer instance
      const duration = window.wavesurfer.getDuration()

      // Format the duration into "mm:ss" format and store it in the audioTime state object
      audioTime.value.duration = formatAudioTime(duration)
    })
    
    
    // When the audio pauses
    window.wavesurfer.on('pause', () => {
      isPaused.value = true
      isPlaying.value = false
    })
    
    
    // When the audio is playing
    window.wavesurfer.on('timeupdate', function () {
      // Get the elapsed time of the audio (the part that has been played so far) in seconds
      const elapsed = window.wavesurfer.getCurrentTime()
      
      // Format the elapsed time into "mm:ss" format and store it in the audioTime state object
      audioTime.value.elapsedTime = formatAudioTime(elapsed)
      
      // Handle seekSlider here
      const seekSlider = document.getElementById('seekSlider')
      
      // Get the total duration of the audio in seconds
      const duration = window.wavesurfer.getDuration()
      
      // Calculate the slider value based on the current playback time
      const sliderValue = (elapsed / duration) * 100
  
      // Update the seek slider value
      seekSlider.value = sliderValue
      
      // update played part of the seek slider
      colorPlayedPart(seekSlider)
    })
    
    
    // Listen for the 'finish' event
    window.wavesurfer.on('finish', () => {
      // If player is on repeat, replay the audio when it ends
      if (toRepeat.value === true) window.wavesurfer.play()
      
      
      // If player is on play-by-order, play the next song
      if (toOrder.value === true) {
        // Find the index of the currently playing track
        const currentTrackIndex = playlist.value.findIndex(file => file.name === currentTrack.value.name)
        
        // Determine the index of the next track in the playlist
        const nextTrackIndex = currentTrackIndex + 1

        // Check if there is no next track (end of playlist)
        if (playlist.value[nextTrackIndex] === undefined) {
          // If so, play the first track and exit the function
          play(playlist.value[0])
          return
        }
        
        // If the next track exists, play it
        play(playlist.value[nextTrackIndex])
      }
    })
  }



  return { playlist, playlistToggle, currentTrack, play, audioListLoading, isPlaying, isPaused, toRepeat, toOrder, waveformLoading, audioTime, progressBar }
})
