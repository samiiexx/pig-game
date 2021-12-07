// Copyright 2021 sfchi
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let diceOne = document.getElementById("dice-1");
let diceTwo = document.getElementById("dice-2");

const scoreOne = document.getElementById("score--0");
const scoreTwo = document.getElementById("score--1");
const currentOne = document.getElementById("current--0");
const currentTwo = document.getElementById("current--1");
const nameOne = document.getElementById("name--0");
const nameTwo = document.getElementById("name--1");
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
const finalScore = document.getElementById("final-score");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let scores, roundScore, activePlayer, gamePlaying, rolls, rollDice;

init();

let lastDice;

btnRoll.addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Generate random number
    diceOne = Math.floor(Math.random() * 6) + 1;
    diceTwo = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";

    document.getElementById("dice-1").src = "images/dice-" + diceOne + ".png";
    document.getElementById("dice-2").src = "images/dice-" + diceTwo + ".png";

    // 3. Update the round score IF the rolled number is NOT 1

    // // Challenge One: Player loses entire score when two 6s are rolled.
    // if (dice === 6 && lastDice === 6) {
    //   scores[activePlayer] = 0;
    //   document.querySelector("#score--" + activePlayer).textContent = 0;
    //   nextPlayer();
    // } else if (dice > 1) {
    //   // Add Score
    //   roundScore += dice;
    //   document.querySelector("#current--" + activePlayer).textContent =
    //     roundScore;
    // } else {
    //   // Move to next player
    //   nextPlayer();
    // }

    // lastDice = dice;

    // Challenge Three
    if (diceOne !== 1 || diceTwo !== 1) {
      // Player
      roundScore += diceOne + diceTwo;
      document.querySelector("#current--" + activePlayer).textContent =
        roundScore;
    } else {
      // Move to next player
      nextPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Add current score to global score
    scores[activePlayer] += roundScore;

    // 2. Update the UI
    document.querySelector("#score--" + activePlayer).textContent =
      scores[activePlayer];

    // 3. Check if player won the game
    // Challenge Two
    let input = finalScore.value;
    let winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name--" + activePlayer).textContent = "Winner!";

      diceOne.style.display = "none";
      diceTwo.style.display = "none";

      document
        .querySelector(".player--" + activePlayer)
        .classList.add("winner");
      document
        .querySelector(".player--" + activePlayer)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Move to next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  currentOne.textContent = 0;
  currentTwo.textContent = 0;
  playerOne.classList.toggle("active");
  playerTwo.classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

btnNew.addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  rolls = 2;
  rollDice = [];

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  currentOne.textContent = 0;
  currentTwo.textContent = 0;
  nameOne.textContent = "Player 1";
  nameTwo.textContent = "Player 2";
  playerOne.classList.remove("winner");
  playerTwo.classList.remove("winner");
  playerOne.classList.remove("active");
  playerTwo.classList.remove("active");
  playerOne.classList.add("active");
}
