document.addEventListener('DOMContentLoaded', function () {
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



    let currentQuestionIndex;
    let timerCountdown = 60;
    let score = 0;
    let timer;

    const questions = [
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
        }
    ]


    startButton.addEventListener('click', startGame);
    highScoresButton.addEventListener('click', displayHighScores);
    saveScoreButton.addEventListener('click', saveHighScore);

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

    function startTimer() {
        timer = setInterval(function () {
            timerCountdown--;
            timeElement.textContent = timerCountdown;
            if (timerCountdown <= 0) {
                clearInterval(timer);
                endGame();

            }
        }, 1000);
    }



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
    function resetState() {

        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
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
        }, 1000);

    }

    function displayAnswerResult(isCorrect) {
        const message = document.createElement('div');
        message.classList.add(isCorrect ? 'correct' : 'incorrect');
        message.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
        answerButtonsElement.appendChild(message);

    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function endGame() {
        clearInterval(timer);
        questionContainerElement.classList.add('hide');
        endScreen.classList.remove('hide');
        finalScoreElement.textContent = score;
    }


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
        displayHighScores();
    }



});