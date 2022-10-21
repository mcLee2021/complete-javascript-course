'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
//starting condition
let currentScore, player, playing, scores;
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  player = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore1.textContent = 0;
  currentScore0.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
};
init();
//rolling dice functionality
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${player}`).textContent = currentScore;
  player = player === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    //1.generating a random dice roll
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    //2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;
    //3.check if the dice number is 1, if true, switch player
    if (randomNumber === 1) {
      switchPlayer();
    } else {
      currentScore += randomNumber;

      document.getElementById(`current--${player}`).textContent = currentScore;
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    //1.add the current number to current player's score
    scores[player] += currentScore;
    document.getElementById(`score--${player}`).textContent = scores[player];
    //2.check if the score is >= 100, if true, finish the game
    if (scores[player] >= 10) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  init();
});
