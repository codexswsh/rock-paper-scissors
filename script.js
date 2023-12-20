const modalBtn = document.querySelector(".rules");
const closebtn = document.querySelector(".close-btn");
const modalDiv = document.querySelector(".modal");

modalBtn.addEventListener('click', function(){
  modalDiv.style.display='block';
})
closebtn.addEventListener('click', function(){
  modalDiv.style.display = "none";
})

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__pc");
const scoreNumber1 = document.querySelector(".score__yours");
const winnerBtn = document.querySelector(".next");

// Load scores from local storage
let pcScore = parseInt(localStorage.getItem('pcScore')) || 0;
let yourScore = parseInt(localStorage.getItem('yourScore')) || 0;

function updateScores() {
  scoreNumber.innerText = pcScore;
  scoreNumber1.innerText = yourScore;
}

updateScores();

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = pcChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function pcChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win Against PC";
      resultDivs[0].classList.toggle("winner");
      yourScore++;
      localStorage.setItem('yourScore', yourScore);
      updateScores();
      winnerBtn.style.display = "block";
    } else if (aiWins) {
      resultText.innerText = "you lose Against PC";
      resultDivs[1].classList.toggle("winner");
      pcScore++;
      localStorage.setItem('pcScore', pcScore);
      updateScores();
    } else {
      resultText.innerText = "TIE UP";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});
