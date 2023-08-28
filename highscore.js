const highScoreList = document.getElementById("high-score-list");
const highScores = JSON.parse(localStorage.getItem("highScoreStorage")) || [];

function createHighScoreElement(name, score) {
  const displayHighScore = document.createElement("div"); // create container for appending the H3
  displayHighScore.classList.add("container");

  const playerName = document.createElement("h3"); // Create an h3
  playerName.textContent = name;

  const playerScore = document.createElement("h3"); // Create a h3
  playerScore.textContent = score;

  displayHighScore.append(playerName, playerScore);

  highScoreList.appendChild(displayHighScore);
}

// Sort high scores by score in descending order
const sortedHighScores = highScores.sort((a, b) => b.score - a.score);

// Loop through the first 10 sorted high scores and create HTML elements for each
for (let i = 0; i < Math.min(10, sortedHighScores.length); i++) {
  const score = sortedHighScores[i];
  createHighScoreElement(score.name, score.score);
}
