




    

// Start Quiz function
var startQuiz = function() {};



// clear start page function
var clearPage = function() {

    var titleEl = document.querySelector('#title');
    titleEl.remove();

    var inStructEl = document.querySelector('#instructions');
    inStructEl.remove();
    
    var btnEl = document.querySelector('#startBtn');
    btnEl.remove();

    // starts quiz after page cleared
    startQuiz();
};


// page clears after start button clicked and quiz starts
addEventListener("click", clearPage);

