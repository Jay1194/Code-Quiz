
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
  createBtnEl.textContent = " Save";

  // Append the label and input box and save button to the parent element
  forLabelEl.appendChild(label);
  forLabelEl.appendChild(input);
  subBtnEl.appendChild(createBtnEl);

  clearInterval(startCountdown);
};

// Load the next question and choices
loadQuest();
};


// create timer function
var countdown = function() {
  console.log(counter);
  countDisplayEl.textContent = counter;
  counter--;

  // if time runs out
  if (counter <= 0) {
  
    clearInterval(startCountdown);

    spanEl = document.querySelector('span');
    spanEl.innerHTML = '';

    pEl = document.getElementById('black');
    pEl.innerHTML = '';

    window.alert('Your Out Of Time!');

  // Take us to highscore page
    currentQuestionIndex = 3
    nextQuest();
  }
};
 
 
// clear start page function
var clearPage = function() {
    
    var titleEl = document.querySelector('#title');
    titleEl.remove();

    var inStructEl = document.querySelector('#instructions');
    inStructEl.remove();
    
    btnEl.remove();

    var spanEl = document.querySelector('span');
    
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
      counter -= 15;

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



