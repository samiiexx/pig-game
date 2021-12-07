const diceDOM = document.querySelector(".dice");
const diceTwo = document.querySelector(".dice-2");
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

let scores, roundScore, activePlayer, gamePlaying;

init();

diceTwo.style.display = "none";

btnRoll.addEventListener("click", () => {
 
  if (gamePlaying) {
    // 1. Generate random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    diceDOM.style.display = "block";
    diceDOM.src = "images/dice-" + dice + ".png";

    // 3. Update the round score IF the rolled number is NOT 1
    if (dice > 1) {
      // Add Score
      roundScore += dice;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    }
    else {
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
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name--" + activePlayer).textContent = "Winner!";
      diceDOM.style.display = "none";
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

  diceDOM.style.display = "none";
}

btnNew.addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  diceDOM.style.display = "none";
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
