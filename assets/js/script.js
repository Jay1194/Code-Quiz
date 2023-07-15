
// global variables
var btnEl = document.getElementById('startBtn');


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

  // dynamically generate question
  var questionEl = document.getElementById('quest');
  var questEl = document.createElement('li')
  questEl.textContent = (questions[0]['question']);
  questEl.classname = 'questions';
  questionEl.appendChild(questEl);

  // dynamically generate choices
  var choiceEl = document.getElementById('choice');

// create for loop to generate all choices
var firstQuestion = questions[0]; // Retrieve the first question object
var answers = firstQuestion.answer; // Retrieve the answers array for the first question

for (var i = 0; i < answers.length; i++) {
  var choices = answers[i].choice;
  console.log(choices);

  var choiEl = document.createElement('li')
  choiEl.className = 'multi-choice';
  choiEl.textContent = choices;
  choiceEl.appendChild(choiEl);
}
};






// clear page


// cycle through questions


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


// page clears after start button clicked and quiz starts
btnEl.addEventListener("click", clearPage);








