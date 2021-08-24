/* DOM */
// modal rules
const rules = document.getElementById("rules");
const popup = document.getElementById("background");
const closePopup = document.getElementById("btnClose");
// modal winner
const modalBackground = document.getElementById("back");
const modalWinner = document.getElementById("winnerPopup");
const closeModalWinner = document.getElementById("buttonClose");
let winnerOfGame = document.getElementById("winner");
// roll dice and hold
const rollDice = document.getElementById("rollDice");
const hold = document.getElementById("hold");
// new game
const newGame = document.getElementById("newGame");
// dice
const diceNumber = document.getElementById("number");
// player 1
const playerOne = document.getElementById("playerOne");
const playOne = document.querySelector(".player1")
let playerOneCurrentScore = document.getElementById("currentScorePlayerOne");
let playerOneTotalScore = document.getElementById("totalScorePlayerOne");
// player 2 
const playerTwo = document.getElementById("playerTwo");
const playTwo = document.querySelector(".player2");
let playerTwoCurrentScore = document.getElementById("currentScorePlayerTwo");
let playerTwoTotalScore = document.getElementById("totalScorePlayerTwo");

/* VARIABLES */
const diceAudio = new Audio("./sounds/rolling-dice.wav");
const winnerAudio = new Audio("./sounds/win.flac");
let value;
let activePlayer = playerOne;
const dice = [
  "dice-1.svg",
  "dice-2.svg",
  "dice-3.svg",
  "dice-4.svg",
  "dice-5.svg",
  "dice-6.svg",
];

/* FUNCTIONS */
// modal rules
const modalRules = () => {
  popup.style.display = "block";
};

const closeModalRules = () => {
  popup.style.display = "none";
};

const closeModal = () => {
  modalBackground.style.display = "none";
  modalWinner.style.display = "none";
};

// roll dice
const rollDicePlayer = () => {
  value = Math.floor(Math.random() * 6 + 1);
  diceNumber.src = "./images/" + dice[value - 1];
  diceAudio.play();
  if (activePlayer == playerOne) {
    playerOneCurrentScore.innerHTML = parseInt(playerOneCurrentScore.innerHTML) + value;
    if (value == 1) {
      playerOneCurrentScore.innerHTML = 0;
      nextPlayer();
    }
  } else {
    playerTwoCurrentScore.innerHTML = parseInt(playerTwoCurrentScore.innerHTML) + value;
    if (value == 1) {
      playerTwoCurrentScore.innerHTML = 0;
      nextPlayer();
    }
  }
}

// next player
const nextPlayer = () => {
  activePlayer = activePlayer == playerOne ? playerTwo : playerOne;
  if (activePlayer == playerTwo) {
    activePlayer.classList.add("player-active");
    playerOne.style.background = "#ffffff";
    playOne.style.fontWeight = "100";
    playerTwo.style.background = "#f7f7f7";
    playTwo.style.fontWeight = "300";
  } else {
    activePlayer.classList.remove("player-active");
    playerOne.style.background = "#f7f7f7";
    playOne.style.fontWeight = "300";
    playerTwo.style.background = "#ffffff";
    playTwo.style.fontWeight = "100";
  }
};
  
// hold
const holdPoints = () => {
  if (activePlayer == playerOne) {
    playerOneTotalScore.innerHTML =
    parseInt(playerOneTotalScore.innerHTML) + parseInt(playerOneCurrentScore.innerHTML);
    playerOneCurrentScore.innerHTML = 0;
    playerOneTotalScore.innerHTML >= 100 ? endGame() : nextPlayer();
  } else {
    playerTwoTotalScore.innerHTML =
    parseInt(playerTwoTotalScore.innerHTML) + parseInt(playerTwoCurrentScore.innerHTML);
    playerTwoCurrentScore.innerHTML = 0;
    playerTwoTotalScore.innerHTML >= 100 ? endGame() : nextPlayer();
  }
};

// end game
const endGame = () => {
  modalBackground.style.display = "block";
  modalWinner.style.display = "block";
  winnerAudio.play();
  if (activePlayer == playerOne) {
    winnerOfGame.innerHTML = "Player 1";
  } else {
    winnerOfGame.innerHTML = "Player 2";
  }
};

// new game
const restart = () => {
  alert("Nouvelle partie ?");
  playerOneCurrentScore.innerHTML = 0;
  playerTwoCurrentScore.innerHTML = 0;
  playerOneTotalScore.innerHTML = 0;
  playerTwoTotalScore.innerHTML = 0;
};

/* EVENTS */
// modal rules
rules.addEventListener("click", modalRules);
closePopup.addEventListener("click", closeModalRules);
// roll dice
rollDice.addEventListener("click", rollDicePlayer);
// hold
hold.addEventListener("click", holdPoints);
// new game
newGame.addEventListener("click", restart);
// winner
closeModalWinner.addEventListener("click", closeModal);
