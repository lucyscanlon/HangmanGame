'use strict';

// grabbing all elements

let displayWord = document.querySelector('.display--word');
const alphabetButtons = document.querySelectorAll('.alphabet--button');
const highScoreEl = document.querySelector('.high--score');
const currentScoreEl = document.querySelector('.current--score');
const lettersLeftEl = document.querySelector('.letters--left');
const livesLeftEl = document.querySelector('.lives--left');
const livesUsedEl = document.querySelector('.lives--used');

// secret word
const secretWord = "HELLO";
let guessingWord = ['_', '_', '_', '_', '_'];
let score = 10;
let lettersToGuess = 5;
let livesLeft = 10;
let livesUsed = 0;

//setting all scores
highScoreEl.textContent = 0;
currentScoreEl.textContent = 10;
lettersLeftEl.textContent = 5;
livesLeftEl.textContent = 10;
livesUsedEl.textContent = 0;


displayWord.textContent = "_____";

// add event listeners to all alphabet buttons
alphabetButtons.forEach(item =>{
  item.addEventListener('click', function checkGuess() {
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
        }
      }

      // if letter correct is false then change
      //color to red and remove event listener
      if(!letterCorrect) {
        console.log(guessedLetter, 'incorrect');
        item.parentNode.classList.add('button--incorrect--inactive');
        item.removeEventListener('click', checkGuess);

        //update scores
        score--;
        livesLeft--;
        livesUsed++;
        currentScoreEl.textContent = score;
        livesLeftEl.textContent = livesLeft;
        livesUsedEl.textContent = livesUsed;
      }
    })
  })
