import handleFiles from './handleFiles'
/***
    # This code sets up drag-and-drop functionality for the entire window. When files are dragged over, dragged out of, or dropped onto the window, appropriate event listeners below trigger actions. 
    # When files are dropped, the code passes the files to handleFiles module to be processed.
***/

export default function dropzone(playerStore) {
  // Define the dropZone variable as the entire window
  const dropZone = window
  
  // This variable stores the container indicated when files are dragged over on the page.
  const dragFilesContainer = document.getElementById('dragFilesContainer')
  
  // Add event listener for when a file is dragged over the window
  dropZone.addEventListener('dragover', function(e) {
      // Prevent default behavior of the browser
      e.preventDefault()
      
      // Do nothing if files are currently being processed
      if (playerStore.audioListLoading) return
  
      // Displays the dragFilesContainer when files are dragged over the page/window
      dragFilesContainer.style.display = 'block'
  })
  
  // Add event listener for when a file is dragged out of the window
  dropZone.addEventListener('dragend', function(e) {
      // Prevent default behavior of the browser
      e.preventDefault()
      
      // Do nothing if files are currently being processed
      if (playerStore.audioListLoading) return
  
      // Hides the dragFilesContainer when files are dropped on the page/window
      dragFilesContainer.style.display = 'none'
  })
  
  
  // Add event listener for when a file is dropped onto the window
  dropZone.addEventListener('drop', function(e) {
      // Prevent default behavior of the browser
      e.preventDefault()
      
      // Do nothing if files are currently being processed
      if (playerStore.audioListLoading) return
  
      // First hide the dragFilesContainer when files are dropped on the page/window
      dragFilesContainer.style.display = 'none'
  
      // Retrieve the dropped files from the event object
      const files = e.dataTransfer.files
  
      // Then pass files and app states to handleFiles method
      handleFiles(files, playerStore)
  })
}