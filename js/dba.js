// Function to play looping audio
function playLoopingAudio() {
    const audio = new Audio('mp3/dumbass_mode.mp3'); // Replace 'your-audio-file.mp3' with your audio file's path
    audio.loop = true; // Set the audio to loop
  
    // Ensure audio is played only in response to user interaction
    document.addEventListener('click', () => {
      audio.play().catch(error => {
        // Handle any errors, such as browser autoplay policy restrictions
        console.error('Audio playback error:', error);
      });
    });
  }
  
  // Function to add the dba.css stylesheet to the HTML
  function addDbaCss() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './css/dba.css'; // Replace 'dba.css' with the path to your dba.css file
    document.head.appendChild(link);
  }
  
  // Play audio and add CSS when the page loads if the URL contains #dba
  window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#dba') {
      playLoopingAudio();
      addDbaCss();
    }
  });
  