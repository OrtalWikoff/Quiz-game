
// Gathering HTML elements
var quizBody = document.getElementById("JavaQuiz");
var resultsEl = document.getElementById("answers");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("end");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("firstPage");
var highscoreContainer = document.getElementById("highScore");
var highscoreDiv = document.getElementById("scorePage");
var highscoreInputName = document.getElementById("name");
var endGameBtns = document.getElementById("endQuiz");
var submitScoreBtn = document.getElementById("submitScore");
var answerTextA4 = document.getElementById("answerText");
var orderdlists = document.getElementById("orderdlist");
var scoreHeadid = document.getElementById("scoreHead");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz questions 
var quizQuestions = [{
    question: "What will be the value returned from the code? console.log(Math.floor(8.44))",
    choiceA: "Null",
    choiceB: "8",
    choiceC: "9",
    choiceD: "Undefined",
    correctAnswer: "b"},
  {
    question: "What is .findAge()?",
    choiceA: "Method",
    choiceB: "String",
    choiceC: "Array",
    choiceD: "Number",
    correctAnswer: "a"},
   {
    question: "What value will be printed to the console by the following code block? let number; console.log(number); ",
    choiceA: "0",
    choiceB: "Error",
    choiceC: "undefined",
    choiceD: "number",
    correctAnswer: "c"},
    {
    question: "What is the syntex for multiline JavaScript comments?",
    choiceA: "Any text after //",
    choiceB: "=",
    choiceC: "Any text between /* and */",
    choiceD: "comment",
    correctAnswer: "c"},
    {
    question: "How would you round the following number, 9.99, down to and integer?",
    choiceA: "floor(9.99)",
    choiceB: "Math roundDown(9.99)",
    choiceC: "Math(9.99.floor)",
    choiceD: "Math.floor(9.99)",
    correctAnswer: "d"},  
    {
    question: "The Date library contains several methods that can be used in the JavaScript code. which line of code properly call the method now() of that library?",
    choiceA: "Date().now;",
    choiceB: "Date.now();",
    choiceC: "Date.now",
    choiceD: "now()",
    correctAnswer: "b"},
    {
    question: "Which of the following is not a valid way to declaring a new JavaScript variable called food?",
    choiceA: "var food = 'Pizza';",
    choiceB: "const food = 'Pizza';",
    choiceC: "let food = 'Pizza';",
    choiceD: "love food = 'Pizza';",
    correctAnswer: "d"},
        
    ];
    
// global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 50;
var timerInterval;
var score = 0;
var correct;

//start the quiz on click
startQuizButton.addEventListener("click",startQuiz);

//function to generate questions and answers
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";

    if (currentQuestionIndex === finalQuestionIndex){
       return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        answerTextA4.textContent = "That Is Correct!";
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        answerTextA4.textContent = "That Is Incorrect!";
        timeLeft--;
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

//This function is for last screen that display score
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// Start Quiz function
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    highscoreContainer.style.display = "none";

    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

//Function to show high score on click 
submitScoreBtn.addEventListener("click", function highscore(event){
    event.preventDefault(); 
    var savedHighscores = JSON.parse(localStorage.getItem("name")) || [];
    if(highscoreInputName.value === "") {
        alert("Name cannot be blank");
        return false;
    }else{
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("name", JSON.stringify(savedHighscores));
        generateHighscores(savedHighscores);

    }
    
});

//Clear list of high scores and generate new scores
function generateHighscores(event, savedHighscores){ 
        var savedHighscores = JSON.parse(localStorage.getItem("name")) || [];
        for (i=0; i<savedHighscores.length; i++){
        var newNameSpan = document.createElement("li");
        newNameSpan.textContent = savedHighscores[i].name + "-" + savedHighscores[i].score;
        orderdlists.appendChild(newNameSpan);
    }
}

function clearHighScore(){
    localStorage.removeItem("name")
    location.reload()
}

//  function that displays the high scores page 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

//  clear all to start a new quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}



