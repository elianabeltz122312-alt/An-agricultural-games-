  const tools = [
  "Rake", "Shovel", "Hoe", "Watering Can", 
  "Tractor", "Wheelbarrow", "Scythe", "Pitchfork"
];

// Duplicate the array for matching pairs
let cardValues = [...tools, ...tools];
cardValues.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("gameBoard");
let flippedCards = [];
let matchedCards = [];

function createCards() {
  gameBoard.innerHTML = ""; // clear board
  cardValues.forEach((tool, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.tool = tool;

    const front = document.createElement("div");
    front.classList.add("front");
    front.innerText = tool; // you can replace with image later

    const back = document.createElement("div");
    back.classList.add("back");
    back.innerText = "🌾"; // fun farm emoji for back

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flip")) {
    card.classList.add("flip");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.tool === card2.dataset.tool) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cardValues.length) {
      setTimeout(() => alert("🎉 You matched all tools!"), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
    }, 1000);
  }
}

document.getElementById("restartBtn").addEventListener("click", () => {
  cardValues.sort(() => 0.5 - Math.random());
  flippedCards = [];
  matchedCards = [];
  createCards();
});

// Initialize the game
createCards();
