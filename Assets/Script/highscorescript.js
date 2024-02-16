
    const highScoresList = document.getElementById('high-scores-list');

    function displayHighScores() {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScoresList.innerHTML = '';
        highScores.forEach((score, index) => {
            const scoreElement = document.createElement('div');
            scoreElement.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
            highScoresList.appendChild(scoreElement);
        });
    }
    
    displayHighScores(); 
