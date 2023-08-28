import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas, 2, "red", true);
const enemyBulletController = new BulletController(canvas, 5, "yellow", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);

const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function startGame() {
  const playerNameInput = document.getElementById("player-name-input");
  const submitButton = document.getElementById("name-submit-button");
  const playerScore = document.getElementById("player-score");
  const header = document.getElementById("title");
  const invaders = document.getElementById("invaders");

  header.style.display = "none";
  playerScore.style.display = "flex";
  playerNameInput.style.display = "none";
  submitButton.style.display = "none";
  invaders.style.display = "none";

  // Start the game loop
  setInterval(game, 1000 / 60);
}

// Background music
const audio = new Audio("bg-music-David_Fesliyan.mp3");
audio.volume = 0.1; // volume between 0 and 1

function game() {
  audio.play();
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // This ensures the JavaScript runs after the DOM has been fully loaded

  // Get a reference to the button element
  const submitButton = document.getElementById("name-submit-button");

  const playerNameInput = document.getElementById("player-name-input"); // Reference to the task name input element

  // Add a click event listener to the button
  submitButton.addEventListener("click", (event) => {
    if (playerNameInput.value.length < 3 || playerNameInput.value.length > 3)
      return;
    event.preventDefault();
    getPlayerName(); // Get the player's name
    startGame(); // Start the game
  });
});

// Start local storage
const localStorageKey = "highScoreStorage"; // Key for storing data in local storage
let highScoreArray = JSON.parse(localStorage.getItem(localStorageKey)) || []; // Array to store task data retrieved from local storage or empty array if no data exists

// Function to add a new high score
function addHighScore(highScore) {
  highScoreArray.push(highScore); // Add the new high score to the highScoreArray
  updateLocalStorage(); // Update the local storage with the updated highScoreArray data
}

function updateLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(highScoreArray));
}
// End local storage

function getPlayerName() {
  const playerNameInput = document.getElementById("player-name-input"); // Get the input element
  const playerName = playerNameInput.value; // Retrieve the value from the input
  const playerNameDisplay = document.getElementById("player-name-display");

  // Update the display with the retrieved player name
  playerNameDisplay.textContent = playerName;
}

function displayGameOver() {
  if (isGameOver) {
    canvas.style.display = "none";

    let displayWinOrGameOver = didWin ? "YOU WIN!" : "GAME OVER!";

    const displayGameEnd = document.getElementById("display-game-end");

    displayGameEnd.textContent = displayWinOrGameOver;
  }
}

function checkGameOver() {
  const playerNameInput = document.getElementById("player-name-input");
  const playerScoreDisplay = document.getElementById("score-display");

  const playerName = playerNameInput.value; // Extract player name from the input
  const playerScoreText = playerScoreDisplay.textContent; // Extract player score text content from the display
  const playerScore = parseInt(playerScoreText); // Convert the score text to an integer

  const highScoreId = Date.now();

  const highScore = {
    name: playerName,
    score: playerScore,
    id: highScoreId,
  };

  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    addHighScore(highScore); // Pass the highScore object to addHighScore()
    isGameOver = true;
    redirect();
  }

  if (enemyController.collideWith(player)) {
    addHighScore(highScore); // Pass the highScore object to addHighScore()
    isGameOver = true;
    redirect();
  }

  if (enemyController.enemyRows.length === 0) {
    addHighScore(highScore); // Pass the highScore object to addHighScore()
    didWin = true;
    isGameOver = true;
    redirect();
  }
}

function redirect() {
  setTimeout(myURL, 6000);
}

function myURL() {
  document.location.href = "highscore.html";
}
