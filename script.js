'use strict';

const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

score1.textContent = 0;
score2.textContent = 0;
dice.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    const diceRandom = Math.trunc(Math.random() * 6 + 1);

    dice.classList.remove('hidden');
    dice.src = `dice-${diceRandom}.png`;

    if (diceRandom !== 1) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      playing = false;

      dice.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  score = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  score1.textContent = 0;
  score2.textContent = 0;
  dice.classList.add('hidden');

  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  //ใน javascript ถ้าเพิ่ม class ที่มีอยู่แล้วมันจะไม่เพิ่มเข้าไปอีก
});
