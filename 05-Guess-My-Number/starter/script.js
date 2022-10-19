'use strict';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  if (guess) {
    if (guess === secretNumber) {
      if (score > highScore) {
        document.querySelector('.highscore').textContent = score;
      }
      document.querySelector('.number').textContent = guess;

      displayMessage('Correct!');
      document.querySelector('body').style.backgroundColor = 'green';
      document.querySelector('.number').width = '30rem';
    } else {
      displayMessage(guess > secretNumber ? 'Too High!' : 'Too Low!');
      score -= 1;
    }
    if (score === 0) {
      displayMessage('You lost!');
    }
    document.querySelector('.score').textContent = score;
  } else {
    displayMessage('Please enter a number');
  }

  document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    document.querySelector('.score').textContent = score;
    displayMessage('Start guessing...');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('.number').width = '15rem';
  });
});
