
// global variables
var btnEl = document.getElementById('startBtn');
var choiceEl = document.getElementById('choice');
var questionEl = document.getElementById('quest');
var currentQuestionIndex = 0;

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

console.log(questions);



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

// Check if all questions have been displayed
currentQuestionIndex == questions.length

// Clear the previous question and choices
choiceEl.innerHTML = '';
questionEl.innerHTML = '';

// Load the next question and choices
loadQuest();
};

// keep track of score 


// create timer 


// clear start page function
var clearPage = function() {
    
    var titleEl = document.querySelector('#title');
    titleEl.remove();

    var inStructEl = document.querySelector('#instructions');
    inStructEl.remove();
    
    
    btnEl.remove();

    // starts quiz after page cleared
    loadQuest();
};

// when choice is clicked
choiceEl.addEventListener('click', function(event) {

  // Access the clicked choice and perform desired actions
  var selectedChoice = event.target.textContent;
  console.log("Selected choice:", selectedChoice);

// clear page after choice made
 if (event){
    nextQuest();
 }
});

// page clears after start button clicked and quiz starts
btnEl.addEventListener("click", clearPage);









