import arrayBufferToBase64 from './arrayBufferToBase64'

// Define the types for jsmediatags data
interface Tag {
  tags: {
    title?: string,
    artist?: string,
    album?: string,
    year?: string,
    picture?: {
      data: ArrayBuffer,
      format: string,
    },
  },
}

// Main function to handle the processing of files
const handleFiles = async (files: FileList, playerStore): void => {
  // Define a list of supported audio MIME types
  const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/aac', 'audio/ogg', 'audio/webm']
  
  // Define a list of supported audio file extensions
  const audioExtensions = ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.webm']
  
  // Function to get file extension
  function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase()
  }
  
  // Filter the dropped files to include only those with supported audio formats or extensions
  const validAudioFiles = Array.from(files).filter((file) => {
    const fileExtension = getFileExtension(file.name)
    return audioTypes.includes(file.type) || audioExtensions.includes(`.${fileExtension}`)
  })
  
  // Set the player state to indicate that audio files are being processed
  // This will trigger the display of a loading indicator in the UI
  playerStore.audioListLoading = true
  
  // Function to process each valid audio file
  const processFile = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Use the jsmediatags library to read metadata from the audio file
      window.jsmediatags.read(file, {
        // Callback function to handle the successful reading of metadata
        onSuccess: (tag: Tag) => {
          // Destructure the required metadata tags from the response
          const { title, artist, album, year, picture } = tag.tags
          
          // Variable to hold the cover image data (if available)
          let cover: string | undefined
          
          if (picture) { // if available
            // Convert the picture data (array buffer) to a Base64 string
            const base64String = arrayBufferToBase64(picture.data)
            // Construct the cover image URL in Base64 format
            cover = `data:${picture.format};base64,${base64String}`
          }
          
          // Create a URL for the audio file to be played
          const fileURL = URL.createObjectURL(file)
          
          // Assign the processed file's data into an object
          const processedFile = {
            name: file.name,
            fileURL: fileURL,
            title: title || null,
            artist: artist || 'Unknown Artist',
            album: album || 'Unknown Album',
            year: year || 'Unknown Year',
            cover: cover || null,
            id: 'audio_' + Date.now(),
          }
          
          // Check if the processed file is not already in the playlist
          const fileExists = playerStore.playlist.some((f) => f.name === processedFile.name)
          
          if (!fileExists) {
            // Add the processed file to the beginning of the playlist in store
            playerStore.playlist.unshift(processedFile)
          }
          
          // Resolve the promise once processing is complete
          resolve()
        },
        onError: (error) => {
          // Handle the error and print to console presence of aninvalid file
          console.log('Error reading file: ', file.name, error)
          
          // Then resolve the promise regardless to continue the process
          resolve()
        }
      })
    })
  }
  
  // Loop through each valid audio file and process it
  for (const file of validAudioFiles) {
    await processFile(file)
  }
  
  // Set the player state to indicate that audio files have being processed
  // Hide loading indicator in the UI
  playerStore.audioListLoading = false
  
  // Then play first audio file in the playlist (if no track is playing)
  if (!playerStore.isPlaying) playerStore.play(playerStore.playlist[0])
  
  // Show playlist menu (incase on mobile)
  playerStore.playlistToggle = true
}

export default handleFiles