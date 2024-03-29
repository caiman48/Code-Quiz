// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Grab references to elements on the page

    var startButton = document.getElementById('start-btn');
    var highScoresButton = document.getElementById('high-scores-link');
    var questionContainerElement = document.getElementById('question-container');
    var questionElement = document.getElementById('question');
    var answerButtonsElement = document.getElementById('answer-buttons');
    var timerDisplay = document.getElementById('timer');
    var timeElement = document.getElementById('time');
    var endScreen = document.getElementById('end-screen');
    var finalScoreElement = document.getElementById('final-score');
    var initialsInputEl = document.getElementById('initials');
    var saveScoreButton = document.getElementById('save-score-btn');
    var highScoresList = document.getElementById('high-scores-list');


    // Initialize variables

    let currentQuestionIndex;
    let timerCountdown = 60;
    let score = 0;
    let timer;

    // Questions array

    const questions = [
        // Each object in this array represents a question and its answers
        // correct: true indicates the correct answer
        {
            question: "what does 'var' stand for?",
            answers: [
                { text: 'variable', correct: true },
                { text: 'value', correct: false },
                { text: 'victory', correct: false },
                { text: 'variance', correct: false }
            ]
        },
        {
            question: "Wich method can be used to convert JSON data to a JavaScript object?",
            answers: [
                { text: 'JSON.parse()', correct: true },
                { text: 'JSON.stringify()', correct: false },
                { text: 'JSON.object()', correct: false },
                { text: 'JSON.toJS()', correct: false }
            ]
        },
        {
            question: "What is the purpose of 'console.log' in JavaScript?",
            answers: [
                { text: 'Logs data to the web console', correct: true },
                { text: 'Sends a log message to a server', correct: false },
                { text: 'Starts a new line in the code', correct: false },
                { text: 'Calculates logarithmic operations', correct: false }
            ]
        },
        {
            question: "What does 'API' stand for?",
            answers: [
                { text: 'Application Programming Interface', correct: true },
                { text: 'Automated Process Integration', correct: false },
                { text: 'Advanced Programming Input', correct: false },
                { text: 'Application Protocol Interface', correct: false }
            ]
        },
        {
            question: "how do you create a promise in JavaScript?",
            answers: [
                { text: 'new Promise()', correct: true },
                { text: 'Promise()', correct: false },
                { text: 'createPromise()', correct: false },
                { text: 'promise()', correct: false }
            ]
        },
        {
            question: " how to properly access an HTML element with the ID 'demo' using JavaScript?",
            answers: [
                { text: 'document.getElementByName("demo")', correct: false },
                { text: 'document.getElement("demo")', correct: false },
                { text: 'document.getElementById("demo")', correct: true },
                { text: 'document.getElementByTagName("demo")', correct: false }
            ]
        },

        {
            question: "Are you giving me 100 points for  this challenge :) ? Be carefull you can lost 25 seconds with the wrong answer",
            answers: [
                { text: 'NO!', correct: false },
                { text: 'Of Course', correct: true },
            ],
        },
    ]

    // Event listener to start the game when the start button is clicked

    startButton.addEventListener('click', startGame);

    // Event listener to save the high score when the save button is clicked

    saveScoreButton.addEventListener('click', saveHighScore);

    // Function to start the game

    function startGame() {
        startButton.classList.add('hide');
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        score = 0;
        timerCountdown = 60;
        timeElement.textContent = timerCountdown;
        setNextQuestion();
        startTimer();
    }
    // Function to start the countdown timer

    function startTimer() {
        timer = setInterval(function () {
            timerCountdown--;
            timeElement.textContent = timerCountdown;
            if (timerCountdown <= 0) {
                clearInterval(timer);
                endGame();

            }
        }, 900);
    }


    // Function to display the current question and its answers

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }
    // Function to clear the previous question's answers

    function resetState() {

        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }
    // Function to handle answer selection

    function selectAnswer(e) {
        // Checks if selected answer is correct and updates game state accordingly

        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        if (!correct) {

            timerCountdown = Math.max(timerCountdown - 10, 0);
            timeElement.textContent = timerCountdown;
            displayAnswerResult(false);
        } else {

            score++;
            displayAnswerResult(true);
        }
        setTimeout(() => {
            if (questions.length > currentQuestionIndex + 1) {
                currentQuestionIndex++;
                setNextQuestion();
            } else {
                endGame();
            }
        }, 900);

    }
    // Function to display whether the selected answer was correct or incorrect

    function displayAnswerResult(isCorrect) {

        const message = document.createElement('div');
        message.classList.add(isCorrect ? 'correct' : 'incorrect');
        message.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
        answerButtonsElement.appendChild(message);

    }
    // Function to set up the next question

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }
    // Function to end the game

    function endGame() {
        clearInterval(timer);
        questionContainerElement.classList.add('hide');
        endScreen.classList.remove('hide');
        finalScoreElement.textContent = score;
        var paragraph = document.querySelector('p');
        paragraph.innerText = 'You have completed the challenge!!!';
        console.log('End of game, showing high scores.');
        displayHighScores();


    }

    // Function to save the high score

    function saveHighScore() {
        const initials = initialsInputEl.value.trim();
        if (!initials) {
            alert('Please enter your initials');
            return;
        }
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = { score, initials };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.href = 'highscores.html';
    }



});