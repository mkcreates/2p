  // Function to handle played part of the seek slider
  const colorPlayedPart = function (slider) {
      // Calculate the percentage of the played part
      const slidedPart = (slider.value - slider.min) / (slider.max - slider.min) * 100
  
      // Indicate a background (pink) for the played part of the seek slider
      slider.style.background = `linear-gradient(to right, #FF92F8 0%, #FF92F8 ${slidedPart}%, rgba(255,255,255,0.2) ${slidedPart}%, rgba(255,255,255,0.2) 100%)`
  }
  
  export default colorPlayedPart