document.addEventListener('DOMContentLoaded', () => {
    var startButton = document.getElementById('start-btn');
    var questionContainerElement = document.getElementById('question-container');
    var questionElement = document.getElementById('question');
    var answerButtonsElement = document.getElementById('answer-buttons');
    var timerDisplay = document.getElementById('timer');
    var endScreen = document.getElementById('end-screen');
    var finalScoreElement = document.getElementById('final-score');
    var initialsInputEl = document.getElementById('initials');
    var saveScoreButton = document.getElementById('save-score');

    let currentQuestionIndex, timerCountdown;
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
        question: "What does 'DOM' stand for?",
        answers: [
            { text: 'Document Object Model', correct: true },
            { text: 'Document Object Method', correct: false },
            { text: 'Document Object Model', correct: false },
            { text: 'Document Object Method', correct: false }
        ]
    },
    {
        question: "What does 'API' stand for?",
        answers: [
            { text: 'Application Programming Interface', correct: true },
            { text: 'Application Programming Interface', correct: false },
            { text: 'Application Programming Interface', correct: false },
            { text: 'Application Programming Interface', correct: false }
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
        question:" how to properly access an HTML element with the ID 'demo' using JavaScript?",
        answers: [
            { text: 'document.getElementByName("demo")', correct: false },
            { text: 'document.getElement("demo")', correct: false },
            { text: 'document.getElementById("demo")', correct: true },
            { text: 'document.getElementByTagName("demo")', correct: false }
        ]
    }
    ]
});

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    score = 0;
    timerCountdown = 60;
    timerDisplay.textContent = timerCountdown;
    setNextQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(function () {
        timerCountdown--;
        timerDisplay.textContent = timerCountdown;
        if (timerCountdown <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
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
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        endGame();
    }
}