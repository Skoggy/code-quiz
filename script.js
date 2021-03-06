const startButton = document.getElementById('start-button');
const highScoresButton = document.getElementById('high-scores-button');
const clearHighButton = document.getElementById('clear-btn');
const backHomeButton = document.getElementById('back-home-btn');
const startContainerElement = document.getElementById('start-game-container');
const questionContainerElement = document.getElementById('questions-container');
const highScoresContainerElement = document.getElementById('highscores-container')
const gameOverContainerElement = document.getElementById('game-over-container');
const questionEle = document.getElementById('question');
const answerBtns = document.getElementById('answer-buttons');
const saveBtn = document.getElementById('save-button')
const timerEl = document.getElementById('timer');
const userScoreEl = document.getElementById('user-score')
var scoreListEle = document.getElementById('score-list')
highScore = JSON.parse(localStorage.getItem("highScore") || "[]")

var userNameInput; 

var secondsLeft = 90;
var questionsNumber = -1

let questionShuffled, questionIndex

startButton.addEventListener('click', startGame);
startButton.addEventListener('click', startTime);

//Starts the timer when the game starts
function startTime()  {
    setTimer();
}
//This if the function that gets the timer starting and displays the score when quiz is complete
function setTimer()  {
    var countdown = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0 || questionIndex === questions.length) {
            clearInterval(countdown);
        }
    }, 1000
      )  }
    
function displayScore()  {
        questionContainerElement.classList.add('hide');
        gameOverContainerElement.classList.remove('hide');
        userScoreEl.textContent = "Your score is " + secondsLeft + ".";   
 }
 
 
//This saves the score to the highscores list.
 saveBtn.addEventListener('click', function() {
    //event.preventDefault();
    console.log('save')
     scoreAdd();
})
 
 function scoreAdd ()  {
     userNameInput = document.getElementById('user-name').value 
 
 let newUser = {
     name: userNameInput,
     score: secondsLeft
 }
//Highscore variable declaration
 var highScore = JSON.parse(localStorage.getItem("highScore") || "[]");
 highScore.push(newUser);
 console.log(highScore)
 localStorage.setItem("highScore", JSON.stringify(highScore))
}

 
 



 

//This takes you from the main "page" to the highscores container
highScoresButton.addEventListener('click', highScores);


    
 
 console.log(highScore.length);
    for (var i = 0; i < highScore.length; i++)  {
        var scoreListLi = document.createElement('li')
        scoreListLi.textContent = highScore[i].name + "-" + highScore[i].score
        scoreListEle.appendChild(scoreListLi);
        console.log(highScore)
}

function highScores()   { 
    startContainerElement.classList.add('hide');
    highScoresContainerElement.classList.remove('hide');
}

function refreshPage(){
    window.location.reload();
} 
//clearHighButton.addEventListener('click', function()
   clearHighButton.addEventListener("click", function() {
    localStorage.clear();
    console.log('cleared')
    refreshPage();
   })
    
    
    
//This takes you back the the main page
backHomeButton.addEventListener('click', backHome);

function backHome(){
    startContainerElement.classList.remove('hide');
    highScoresContainerElement.classList.add('hide');
}


//This is the function that starts the game, it is listening for a click on the start button, it also picks a question at random to start with.
function startGame()  {
    console.log('started!');
    startContainerElement.classList.add('hide');
    timerEl.classList.remove('hide');
    questionShuffled = questions.sort(() => Math.floor(Math.random()));
    questionIndex = 0
    console.log(questionShuffled)
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    
}


//This sets the next question shuffled.
function setNextQuestion()  { 
    clearState();
    if (questionShuffled.length < questionIndex +1 ){
        displayScore();
    }
    else {
    visibleQuestion(questionShuffled[questionIndex])
    }
}
//This shows the answers on the buttons and says which is wrong or right
function visibleQuestion(question)  {
    questionEle.innerText = question.question;
    question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    console.log(question.question)
    if (answer.correct){
        button.dataset.correct = answer.correct
    }
    else { 
        button.dataset.wrong = answer.wrong
    }
    button.addEventListener('click', selectAnswer)
    answerBtns.appendChild(button);
    

    //This clears the state after the answer is picked
})
}
function clearState() {
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild)
    }
}



//This gets if the answer selected is correct or not, and then either
// goes to the next question if correct, or takes off 10 seconds and advances if wrong
function  selectAnswer(e)  {
    const buttonSelect = e.target
    const correct = buttonSelect.dataset.correct
    const wrong = buttonSelect.dataset.wrong
    setClassStatus(document.body, correct)
    Array.from(answerBtns.children).forEach(button => {
        setClassStatus(button, button.dataset.correct)
    })
        if (correct) {
        
    questionIndex++
        setNextQuestion();
     }
     else if (wrong) {
      questionIndex++
         secondsLeft = secondsLeft - 10;
         setNextQuestion();
        
     }}

    

    //This sets the class of the answer and changes the background to either red or green depending on if answer is correct or wrong.
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


//These are the list of questions, I will add some more later if time permits.
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