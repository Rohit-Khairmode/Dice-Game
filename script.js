'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const socre0El = document.querySelector('#score--0');
const socre1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const BtnNew = document.querySelector('.btn--new');
const BtnRoll = document.querySelector('.btn--roll');
const BtnHold = document.querySelector('.btn--hold');
const BtnStartPlaying = document.querySelector('.close');
const overlay = document.querySelector('.overlay');
const modelContent = document.querySelector('.modal-content');
const BtnInfo = document.querySelector('.modal');

// modal window working
BtnInfo.addEventListener('click', function () {
  overlay.classList.remove('hidden');
  modelContent.classList.remove('hidden');
});
overlay.addEventListener('click', function () {
  overlay.classList.remove('hidden');
});
BtnStartPlaying.addEventListener('click', function () {
  overlay.classList.add('hidden');
  modelContent.classList.add('hidden');
});
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  socre0El.textContent = 0;
  socre1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--non-active');
  player1El.classList.toggle('player--non-active');
};

// Rolling Dice functionality
BtnRoll.addEventListener('click', function () {
  if (playing) {
    // 1) Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2)Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    //Check for rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

BtnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];

    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});

BtnNew.addEventListener('click', init);
