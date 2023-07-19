// global variables
var btnEl = document.getElementById('startBtn');
var choiceEl = document.getElementById('choice');
var questionEl = document.getElementById('quest');
var currentQuestionIndex = 0;
var highScore = 0;
var forLabelEl = document.getElementById('label');
var startCountdown;
var counter = 60;
var countDisplayEl = document.getElementById('time');
var pEl = document.getElementById('black');

// from clear page
var titleEl = document.querySelector('#title');
var inStructEl = document.querySelector('#instructions');
var spanEl = document.querySelector('span');

// questions
var questions = [
  {
    question: "Arrays in JavaScript can be used to store _______________.",
    answer: [
      { choice: "numbers and strings", isCorrect: false },
      { choice: "other arrays", isCorrect: false },
      { choice: "booleans", isCorrect: false },
      { choice: "all of the above", isCorrect: true },
    ],
  },
  {
    question: "String values must be enclosed within _______________ when being assigned to variables",
    answer: [
      { choice: "commas", isCorrect: false },
      { choice: "curly brackets", isCorrect: false },
      { choice: "quotes", isCorrect: true },
      { choice: "parenthesis", isCorrect: false },
    ],
  },
  {
    question: "The condition in an if / else statement is enclosed with _______________.",
    answer: [
      { choice: "quotes", isCorrect: false },
      { choice: "curly brackets", isCorrect: false },
      { choice: "parenthesis", isCorrect: true },
      { choice: "square brackets", isCorrect: false },
    ],
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: [
      { choice: "JavaScript", isCorrect: false },
      { choice: "terminal/bash", isCorrect: false },
      { choice: "for loops", isCorrect: false },
      { choice: "console.log", isCorrect: true},
    ],
  },
];


// dynamically generate questions
var loadQuest = function() {

var currentQuestion = questions[currentQuestionIndex];
var answers = currentQuestion.answer;

  // dynamically generate question
  var questEl = document.createElement('li');
  questEl.textContent = currentQuestion.question;
  questEl.classname = 'questions';
  questionEl.appendChild(questEl);

// create for loop to generate all choices
for (var i = 0; i < answers.length; i++) {
  var choices = answers[i].choice;

// dynamically generate choices
  var choiEl = document.createElement('li');
  choiEl.className = 'multi-choice';
  choiEl.textContent = choices;
  choiceEl.appendChild(choiEl);
}
};


// cycle through questions
nextQuest = function() {

  //increment the previous question and choices
currentQuestionIndex++;

// Clear the previous question and choices
choiceEl.innerHTML = '';
questionEl.innerHTML = '';

//highscore page function
if (currentQuestionIndex == questions.length) {

  // Highscore Title
  var titleEl = document.createElement('li');
  titleEl.textContent = "HighScore";
  titleEl.classname = 'questions';
  questionEl.appendChild(titleEl);

  // remove high score button and time
  viewHighEl.remove();

  // Your score
  var yourScoreEl = document.createElement('li');
  yourScoreEl.className = 'smallText';
  yourScoreEl.textContent = " Your Score " + highScore ;
  choiceEl.appendChild(yourScoreEl);

  // Create the label element
  var label = document.createElement('label');
  label.textContent = ' Enter Your Intials ';

  // Create the input box element
  var input = document.createElement('input');
  input.type = 'text';


  // Save button
  var subBtnEl = document.getElementById('submit');
  var createBtnEl = document.createElement('button')
  createBtnEl.className = 'btnStyle';
  createBtnEl.textContent = "Save";

  // Append the label and input box and save button to the parent element
  forLabelEl.appendChild(label);
  forLabelEl.appendChild(input);
  subBtnEl.appendChild(createBtnEl);

  // hide and stop timer
  pEl.remove();
  clearInterval(startCountdown);

  // Save button click event listener
  createBtnEl.addEventListener('click', function() {
    var initials = input.value; // Set the initials to the value of the input field
    console.log("Initials: " + initials);

  // Save the initials and score to local storage
    var userData = {
      initials: initials,
      score: highScore
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Initials and score have been saved!');
  });

  return; // Exit the function after creating the high score page
}

// Load the next question and choices
loadQuest();  
};

// create timer function
var countdown = function() {
  countDisplayEl.textContent = counter;
  counter--;

  // if time runs out
  if (counter <= 0) {
  
    clearInterval(startCountdown);

    spanEl = document.querySelector('span');
    spanEl.innerHTML = '';
   
    pEl.innerHTML = '';

    window.alert('Your Out Of Time!');

  // Take us to highscore page
    currentQuestionIndex = 3;
    nextQuest();
  }
};
 
 

var viewHighEl = document.getElementById('score');

// when View high scores is clicked
viewHighEl.addEventListener('click', function(event){

  // Access highscores
  var viewScores = event.target.textContent;
  console.log('This allow us to', viewScores);

  // clear page
  titleEl.textContent = 'High Scores'
    
  inStructEl.textContent = ''; 
  
  pEl.remove();

  viewHighEl.remove();

  btnEl.remove();

  spanEl.textContent = '';

  currentQuestionIndex = 4;

  // Add html / local storage intials and score
  var userDataString = localStorage.getItem('userData');

  if (userDataString) {
    var userData = JSON.parse(userDataString);
    var initials = userData.initials;
    var score = userData.score;

    // Display the initials and score on the page
    var highScoreEl = document.createElement('li');
    highScoreEl.textContent = 'Initials: ' + initials + ' | Score: ' + score;
    choiceEl.appendChild(highScoreEl);
  }
})



// clear start page function
var clearPage = function() {
    
    titleEl.remove();

    inStructEl.remove();
    
    btnEl.remove();

    spanEl.textContent = '';
    
    //start timer on click
    startCountdown = setInterval(countdown, 800);

    // starts quiz after page cleared
    loadQuest();
};


// when choice is clicked
choiceEl.addEventListener('click', function(event) {

  // Access the clicked choice and perform desired actions
  var selectedChoice = event.target.textContent;
  console.log("Selected choice:", selectedChoice);

  var rightAnswer = questions[currentQuestionIndex].answer;

  var selectedChoiceIndex = rightAnswer.findIndex(function(answer) {
    return answer.choice === selectedChoice;
  });

  var isCorrect = rightAnswer[selectedChoiceIndex].isCorrect;
  console.log("Answer is:", isCorrect);

  // Clear page after choice is made
  if (event) {

    // reduce time if answer wrong
    if (!isCorrect) {
      counter -= 12;

      // check if counter value is equal to or less then 0
      if (counter <= 0) {
        countdown();
      }
    };

    // Keep track of score
    if (isCorrect) {
      highScore++;
      console.log("High score:", highScore);
    };

    // If wrong, go to next question
    nextQuest();
  }
});





// page clears after start button clicked and quiz starts
btnEl.addEventListener("click", clearPage);