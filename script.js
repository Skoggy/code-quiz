const startButton = document.getElementById('start-button');
const startContainerElement = document.getElementById('start-game-container');
const questionContainerElement = document.getElementById('questions-container');
const questionEle = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const timerEl = document.getElementById('timer');
var secondsLeft = 90;
var questionsNumber = -1

let questionShuffled, questionIndex

startButton.addEventListener('click', startGame);
startButton.addEventListener('click', startTime)

function startTime()  {
    setTimer();
}

function setTimer()  {
    var countdown = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0 || questionIndex === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);

        }
    }, 1000
      )  }
    



function startGame()  {
    console.log('started!');
    startContainerElement.classList.add('hide');
    timerEl.classList.remove('hide');
    questionShuffled = questions.sort(() => Math.random() -.5);
    questionIndex = 0
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    
}

function setNextQuestion()  {
    clearState()
    visibleQuestion(questionShuffled[questionIndex])
}

function visibleQuestion(question)  {
    questionEle.innerText = question.question;
    question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct){
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerBtns.appendChild(button);
})
}
function clearState() {
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild)
    }
}


function  selectAnswer(e)  {
    const buttonSelect = e.target
    const correct = buttonSelect.dataset.correct
    setClassStatus(document.body, correct)
    Array.from(answerBtns.children).forEach(button => {
        setClassStatus(button, button.dataset.correct)
    }
    )
    goToNextQuestion();
    }
    

function setClassStatus(element, correct) {
    clearClassStatus(element) 
    if (correct){
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearClassStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function goToNextQuestion()  {
  if (answers === true) {
      setNextQuestion();
  }
}




const questions = [
    {
        question: 'String values must be enclosed within ____ when being assigned to variables',
        answers: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parentheses", correct: false }

        ]

    },
    {
        question: 'The condition in an if/else statement is enclosed within ______.',
        answers: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false },
            { text: "square brackets", correct: false },
            { text: "parentheses", correct: true }

        ]

    },
    {
        question: 'Arrays in JavaScript can be used to store____',
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true }

        ]

    },
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }

        ]

    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: "console.log", correct: true },
            { text: "terminal/bash", correct: false },
            { text: "JavaScript", correct: false },
            { text: "for loops", correct: false }

        ]

    }
]