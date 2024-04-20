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
var titleEl = document.querySelector('#title');
var inStructEl = document.querySelector('#instructions');
var spanEl = document.querySelector('span');

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

var loadQuest = function() {
  var currentQuestion = questions[currentQuestionIndex];
  var answers = currentQuestion.answer;
  var questEl = document.createElement('li');
  questEl.textContent = currentQuestion.question;
  questEl.className = 'questions';
  questionEl.appendChild(questEl);
  
  for (var i = 0; i < answers.length; i++) {
    var choices = answers[i].choice;
    var choiEl = document.createElement('li');
    choiEl.className = 'multi-choice';
    choiEl.textContent = choices;
    choiceEl.appendChild(choiEl);
  }
};

nextQuest = function() {
  currentQuestionIndex++;
  choiceEl.innerHTML = '';
  questionEl.innerHTML = '';
  if (currentQuestionIndex == questions.length) {
    var titleEl = document.createElement('li');
    titleEl.textContent = "HighScore";
    titleEl.classname = 'questions';
    questionEl.appendChild(titleEl);
    viewHighEl.remove();
    
    var yourScoreEl = document.createElement('li');
    yourScoreEl.className = 'smallText';
    yourScoreEl.textContent = " Your Score " + highScore ;
    choiceEl.appendChild(yourScoreEl);
    
    var label = document.createElement('label');
    label.textContent = ' Enter Your Intials ';
    
    var input = document.createElement('input');
    input.type = 'text';
    
    var subBtnEl = document.getElementById('submit');
    var createBtnEl = document.createElement('button');
    createBtnEl.className = 'btnStyle';
    createBtnEl.textContent = "Save";
    
    forLabelEl.appendChild(label);
    forLabelEl.appendChild(input);
    subBtnEl.appendChild(createBtnEl);
    
    pEl.remove();
    clearInterval(startCountdown);

createBtnEl.addEventListener('click', function() {
  var initials = input.value;
  var userData = {
    initials: initials,
    score: highScore
  };
  
  localStorage.setItem('userData', JSON.stringify(userData));
  alert('Initials and score have been saved!');
  location.reload()
  })
return; 
}
loadQuest();  
};

var countdown = function() {
  countDisplayEl.textContent = counter;
  counter--;
  if (counter <= 0) {
    clearInterval(startCountdown);
    spanEl = document.querySelector('span');
    spanEl.innerHTML = '';
    pEl.innerHTML = '';
    window.alert('Your Out Of Time!');
    currentQuestionIndex = 3;
    nextQuest();
  }
};

var viewHighEl = document.getElementById('score');

viewHighEl.addEventListener('click', function(event){
  var viewScores = event.target.textContent;
  console.log('This allow us to', viewScores);
  titleEl.textContent = 'High Scores';
  inStructEl.textContent = '';
  pEl.remove();
  viewHighEl.remove();
  btnEl.remove();
  spanEl.textContent = '';
  currentQuestionIndex = 4;
  var userDataString = localStorage.getItem('userData');
  if (userDataString) {
    var userData = JSON.parse(userDataString);
    var initials = userData.initials.toUpperCase();
    var score = userData.score;
    var highScoreEl = document.createElement('li');
    highScoreEl.textContent = 'Initials: ' + initials + ' | Score: ' + score;
    choiceEl.appendChild(highScoreEl);
  }
});

var clearPage = function() {
  titleEl.remove();
  inStructEl.remove();
  btnEl.remove();
  spanEl.textContent = '';
  startCountdown = setInterval(countdown, 800);
  loadQuest();
};

choiceEl.addEventListener('click', function(event) {
  var selectedChoice = event.target.textContent;
  var rightAnswer = questions[currentQuestionIndex].answer;
  var selectedChoiceIndex = rightAnswer.findIndex(function(answer) {
    return answer.choice === selectedChoice;
  });
  var isCorrect = rightAnswer[selectedChoiceIndex].isCorrect;
  if (event) {
    if (!isCorrect) {
      counter -= 12;
      if (counter <= 0) {
        countdown();
      }
    };
    if (isCorrect) {
      highScore++;
    };
    nextQuest();
  }
});
btnEl.addEventListener("click", clearPage);