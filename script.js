const tools = [
  { name: "Rake", img: "images/rake.png" },
  { name: "Hoe", img: "images/hoe.png" },
  { name: "Shovel", img: "images/shovel.png" },
  { name: "Tractor", img: "images/tractor.png" },
  { name: "Plow", img: "images/plow.png" },
  { name: "Watering Can", img: "images/wateringcan.png" },
  { name: "Sickle", img: "images/sickle.png" },
  { name: "Wheelbarrow", img: "images/wheelbarrow.png" }
];

let gameBoard = document.getElementById("game-board");
let movesCounter = document.getElementById("moves");
let matchesCounter = document.getElementById("matches");
let restartBtn = document.getElementById("restart");

let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let matches = 0;

function setupBoard() {
  let cards = [...tools, ...tools]; // duplicate for pairs
  cards.sort(() => 0.5 - Math.random());

  gameBoard.innerHTML = "";
  cards.forEach(tool => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="front">🌱</div>
      <div class="back"><img src="${tool.img}" alt="${tool.name}" title="${tool.name}"></div>
    `;
    card.dataset.name = tool.name;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  moves = 0;
  matches = 0;
  movesCounter.textContent = moves;
  matchesCounter.textContent = matches;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();

  moves++;
  movesCounter.textContent = moves;
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matches++;
  matchesCounter.textContent = matches;

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartBtn.addEventListener("click", setupBoard);

setupBoard();
