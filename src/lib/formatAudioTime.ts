// Function to format audio time in seconds to minutes and seconds format. "mm:ss"
const formatAudioTime = (time: number): string => {
    // Convert time to minutes and seconds
    const minutes: number = Math.floor(time / 60)
    // Convert time to remaining seconds
    const seconds: number = Math.floor(time % 60)

    // Add leading zero to seconds if less than 10
    const formattedSeconds: string = (seconds < 10 ? "0" : "") + seconds
    
    // Return formatted time as a string in "mm:ss" format
    return `${minutes}:${formattedSeconds}`
}

export default formatAudioTime