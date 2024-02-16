// Function to display high scores from local storage
function displayHighScores() {
    // Retrieve high scores from local storage or set to an empty array if none exist
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    // Clear the current list
    highScoresList.innerHTML = '';

    // Create and append score elements to the list
    highScores.forEach((score, index) => {
        const scoreElement = document.createElement('div');
        scoreElement.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresList.appendChild(scoreElement);
    });
}

// Function to clear high scores from local storage and update the display
function clearHighScores() {
    localStorage.removeItem('highScores');
    displayHighScores(); // Refresh the high scores list
}

// Set up the event listeners once the DOM content has loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display high scores on initial load
    displayHighScores(); 

    // Attach event listener to the clear high scores button
    const clearButton = document.getElementById('clear-high-scores');
    if (clearButton) {
        clearButton.addEventListener('click', clearHighScores);
    }
});

// Selectors
const highScoresList = document.getElementById('high-scores-list');