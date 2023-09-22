// Function to render Markdown content using marked.js
// Simple marked function for rendering Markdown
function marked(text) {
    // Replace this with your own Markdown to HTML conversion logic
    // For simplicity, I'll use a basic example here
    return text.replace(/#\s(.+?)\n/g, '<h1>$1</h1>')
               .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
               .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

// Example usage:
const markdownText = '# This is a header\n**This is bold text**\n*This is italic text*';
const htmlContent = marked(markdownText);

// You can now use `htmlContent` in your application


function renderChangelog() {
    // Get the container for the changelog Markdown content
    const changelogContainer = document.getElementById('changelog-markdown');
  
    // Your Markdown content as a string
    const markdownContent = `
    # Current Version - 1.1

    1. Controller Support - **Xbox** Only at this point.
    2. Chnage log - This will show when the game has been updated it will only show once as it will be stored using Local Browser Storage.
    3. Improved AI - This will imporve the **Computer / AI** for the game this also makes the **Hint System** better as well.
    4. New wining screen - ***🎉Confetti bomb!🎉***
    5. Other GUI Fixes

    # v: 1.0
    1. First version of Impossible Tic Tac Toe
      `;
  
    // Render the Markdown content using marked.js
    changelogContainer.innerHTML = marked(markdownContent);
  }
  
  // Call the renderChangelog function when the page loads
  window.addEventListener('DOMContentLoaded', renderChangelog);

  function addCloseButtonListener() {
    const closeButton = document.getElementById('closeButton');
    const changelog = document.querySelector('.changelog');
  
    closeButton.addEventListener('click', () => {
      changelog.style.display = 'none'; // Hide the changelog box when the button is clicked
    });
  }
  
addCloseButtonListener();