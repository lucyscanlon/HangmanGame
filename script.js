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

// secret word
let secretWord = "HELLO";
let guessingWord = ['_', '_', '_', '_', '_'];
let score = 10;
let lettersToGuess = 5;
let livesLeft = 10;
let livesUsed = 0;
let playing = true;
let highScore = 0;

//setting all scores
highScoreEl.textContent = 0;
currentScoreEl.textContent = 10;
lettersLeftEl.textContent = 5;
livesLeftEl.textContent = 10;
livesUsedEl.textContent = 0;

//check guess function


displayWord.textContent = "_____";

// add event listeners to all alphabet buttons
alphabetButtons.forEach(item =>{
  item.addEventListener('click', function checkGuess() {
    if(playing) {
      const guessedLetter = item.textContent;
      let letterCorrect = false;

      // loops over secret word, if guess letter
      // the same then replace that letter in the
      // guessingword array.
      // array joined and displayed to reveal
      // correct guess letter to player
      for(let i = 0; i < secretWord.length; i++) {
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
          item.parentNode.classList.add('button--correct--inactive');
          item.removeEventListener('click', checkGuess);
          item.classList.add('event--off');
          }
        }

        // if letter correct is false then change
        //color to red and remove event listener
        if(!letterCorrect) {
          console.log(guessedLetter, 'incorrect');
          item.parentNode.classList.add('button--incorrect--inactive');
          item.removeEventListener('click', checkGuess);
          item.classList.add('event--off');

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
    }

    })
  })

  // new game button clicked

  newGameEl.addEventListener('click', function () {
    secretWord = "HELLO";
    guessingWord = ['_', '_', '_', '_', '_'];
    score = 10;
    lettersToGuess = 5;
    livesLeft = 10;
    livesUsed = 0;
    playing = true;
    highScore = 0;

    loserOverlay.classList.add('hidden');
    winnerOverlay.classList.add('hidden');

    alphabetButtons.forEach(item => {
      if(item.classList.contains('event--off')){
        item.addEventListener('click', checkGuess() );
      }

    })


  })
