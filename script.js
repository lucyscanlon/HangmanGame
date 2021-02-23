'use strict';

// grabbing all elements

let displayWord = document.querySelector('.display--word');
const alphabetButtons = document.querySelectorAll('.alphabet--button');
let highScore = document.querySelector('.high--score');
let currentScore = document.querySelector('.current--score');

// secret word
const secretWord = "HELLO";
let guessingWord = ['_', '_', '_', '_', '_'];

//setting all scores
highScore.textContent = 0;



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
      }
    })
  })
