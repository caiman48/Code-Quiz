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



        }