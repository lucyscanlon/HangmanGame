'use strict';

// grabbing all elements

let displayWord = document.querySelector('.display--word');
const alphabetButtons = document.querySelectorAll('.alphabet--button');
const highScoreEl = document.querySelector('.high--score');
const currentScoreEl = document.querySelector('.current--score');
const lettersLeftEl = document.querySelector('.letters--left');
const livesLeftEl = document.querySelector('.lives--left');
const livesUsedEl = document.querySelector('.lives--used');
const winnerOverlay = document.querySelector('.winner--overlay--message');
const loserOverlay = document.querySelector('.loser--overlay--message');
const newGameEl = document.querySelector('.newgame--button');
const gameTitle = document.querySelector('.maingame--title');
const buttonsCssOff = document.querySelectorAll('.maingame-alphabet-div-centeralign--active');




// secret word
let secretWord = "HELLO";
let guessingWord = ['_', '_', '_', '_', '_'];
let score = 10;
let lettersToGuess = 5;
let livesLeft = 10;
let livesUsed = 0;
let playing = true;
let highScore = 0;

let needsEventListenerArray = [];

//setting all scores
highScoreEl.textContent = 0;
currentScoreEl.textContent = 10;
lettersLeftEl.textContent = 5;
livesLeftEl.textContent = 10;
livesUsedEl.textContent = 0;

//check guess function


displayWord.textContent = "_____";

const makeClickable = function(element) {
  element.addEventListener('click', function checkGuess() {
    console.log('clicked');

    const guessedLetter = element.textContent;
    let letterCorrect = false;

    for(let i = 0; i < secretWord.length; i++ ) {
      if(guessedLetter === secretWord[i]) {
        guessingWord[i] = guessedLetter;
        console.log(guessedLetter, 'correct');
        displayWord.textContent = guessingWord.join('');
        letterCorrect = true;

        //update scores
        lettersToGuess--;
        lettersLeftEl.textContent = lettersToGuess;

        // Turning the correct selected letter green
        // Removing event listener
        element.parentNode.classList.add('button--correct--inactive');
        element.removeEventListener('click', checkGuess);
        element.classList.add('event--off');
      }
    }

    // if letter correct is false then change
    //color to red and remove event listener
    if(!letterCorrect) {
      console.log(guessedLetter, 'incorrect');
      element.parentNode.classList.add('button--incorrect--inactive');
      element.removeEventListener('click', checkGuess);
      element.classList.add('event--off');

      //update scores
      score--;
      livesLeft--;
      livesUsed++;
      currentScoreEl.textContent = score;
      livesLeftEl.textContent = livesLeft;
      livesUsedEl.textContent = livesUsed;

    }

    // when letters left guessing for reaches 0 display
    // winner overlay and if lives have run out display
    // loser overlay
    if(lettersToGuess < 1) {
      winnerOverlay.classList.remove('hidden');
      playing = false;

      if (score > highScore) {
        highScore = score;
        console.log(highScore);
        highScoreEl.textContent = highScore;
      }

    }

    if(livesLeft < 1) {
      loserOverlay.classList.remove('hidden');
      playing = false;
    }

  })
}


//reset buttons css function
const buttonStyleReset = function(element) {
  element.classList.remove('button--correct--inactive');
  element.classList.remove('button--incorrect--inactive');
}


//add event listeners to all alphabet keys at the start of the game
alphabetButtons.forEach(item => {
  if(playing) {
    makeClickable(item);
  }
})

//if the new game button is pressed
newGameEl.addEventListener('click', function() {
  console.log('hello');

  //reset all scores
  secretWord = "HELLO";
  guessingWord = ['_', '_', '_', '_', '_'];
  score = 10;
  lettersToGuess = 5;
  livesLeft = 10;
  livesUsed = 0;
  playing = true;
  highScore = 0;

  //updating the text content
  currentScoreEl.textContent = 10;
  lettersLeftEl.textContent = 5;
  livesLeftEl.textContent = 10;
  livesUsedEl.textContent = 0;

  displayWord.textContent = "_____";


  //hide winner and loser screen
  loserOverlay.classList.add('hidden');
  winnerOverlay.classList.add('hidden');

  //call function to reset button css style
  buttonsCssOff.forEach(item => {
    buttonStyleReset(item);
  })

  //Add event listeners back to inactive buttons
  const buttonsEventOff = document.querySelectorAll('.event--off');

  buttonsEventOff.forEach(item => {
    item.classList.remove('event--off')
    makeClickable(item);
  })

})
