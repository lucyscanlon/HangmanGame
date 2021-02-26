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
const hangmanImgEl = document.querySelector('.hangman--img');
const winnerOverlaySecretWord = document.querySelector('.winner--secretword');
const loserOverlaySecretWord = document.querySelector('.loser--secretword');

// generate random word function

let randomWord = '';

const generateWord = function() {
  let randomNumber = Math.trunc(Math.random() * 20 + 1 );

  switch(randomNumber) {
    case 1:
      randomWord = 'JAZZY';
      break;
    case 2:
      randomWord = 'BOARD';
      break;
    case 3:
      randomWord = 'BORED';
      break;
    case 4:
      randomWord = 'CADET';
      break;
    case 5:
      randomWord = 'CAROL';
      break;
    case 6:
      randomWord = 'AGONY';
      break;
    case 7:
      randomWord = 'EARLY';
      break;
    case 8:
      randomWord = 'FABLE';
      break;
    case 9:
      randomWord = 'HABIT';
      break;
    case 10:
      randomWord = 'LABOR';
      break;
    case 11:
      randomWord = 'MACHO';
      break;
    case 12:
      randomWord = 'OASIS';
      break;
    case 13:
      randomWord = 'SOBER';
      break;
    case 14:
      randomWord = 'TABLE';
      break;
    case 15:
      randomWord = 'VAGUE';
      break;
    case 16:
      randomWord = 'YACHT';
      break;
    case 17:
      randomWord = 'WACKY';
      break;
    case 18:
      randomWord = 'UDDER';
      break;
    case 19:
      randomWord = 'TABOO';
      break;
    case 20:
      randomWord = 'SMILE';
      break;

  }


}

generateWord()

// secret word
let secretWord = randomWord;
let guessingWord = ['_', '_', '_', '_', '_'];
let score = 10;
let lettersToGuess = 5;
let livesLeft = 10;
let livesUsed = 0;
let playing = true;
let highScore = 0;
let numberofTurn = 0;

hangmanImgEl.src = '/img/hangman0.PNG';

let needsEventListenerArray = [];

//setting all scores
highScoreEl.textContent = 0;
currentScoreEl.textContent = 10;
lettersLeftEl.textContent = 5;
livesLeftEl.textContent = 10;
livesUsedEl.textContent = 0;


displayWord.textContent = "_____";




const makeClickable = function(element) {
  element.addEventListener('click', function checkGuess() {

    const guessedLetter = element.textContent;
    let letterCorrect = false;

    for(let i = 0; i < secretWord.length; i++ ) {
      if(guessedLetter === secretWord[i]) {
        guessingWord[i] = guessedLetter;
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
      element.parentNode.classList.add('button--incorrect--inactive');
      element.removeEventListener('click', checkGuess);
      element.classList.add('event--off');

      //update scores
      score--;
      livesLeft--;
      livesUsed++;
      numberofTurn++;
      currentScoreEl.textContent = score;
      livesLeftEl.textContent = livesLeft;
      livesUsedEl.textContent = livesUsed;

      // Update hangman image
      hangmanImgEl.src = `img/hangman${numberofTurn}.PNG`;

    }

    // when letters left guessing for reaches 0 display
    // winner overlay and if lives have run out display
    // loser overlay
    if(lettersToGuess < 1) {
      winnerOverlay.classList.remove('hidden');
      winnerOverlaySecretWord.textContent = randomWord;
      playing = false;

      if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = highScore;
      }

    }

    if(livesLeft < 1) {
      loserOverlay.classList.remove('hidden');
      loserOverlaySecretWord.textContent = randomWord;
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

  generateWord()

  //reset all scores
  secretWord = randomWord;
  guessingWord = ['_', '_', '_', '_', '_'];
  score = 10;
  lettersToGuess = 5;
  livesLeft = 10;
  livesUsed = 0;
  playing = true;
  numberofTurn = 0;

  //resetting the text content
  currentScoreEl.textContent = 10;
  lettersLeftEl.textContent = 5;
  livesLeftEl.textContent = 10;
  livesUsedEl.textContent = 0;

  displayWord.textContent = "_____";

  // reset hangman image
  hangmanImgEl.src = `img/hangman0.PNG`;


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
