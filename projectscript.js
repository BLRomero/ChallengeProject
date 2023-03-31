const timer = 100;
const columns = 4;
const rows = 6;
const numberOfAnimals = 12;
const totalPairs = (columns * rows) / numberOfAnimals;
const cards = rows * columns;
const board = [];
let pairs = 0;
let currentTurn = [];
let cardsShown = 0;

const Images = {
  barn: {
    class: "barn",
    src: "./images/barn.jpg",
    alt: "barn in a field",
  },
  barndoor: {
    class: "barndoor",
    src: "./images/barndoor.jpg",
    alt: "wooden barn door",
  },
  basketOfEggs: {
    class: "basketOfEggs",
    src: "./images/basketofeggs",
    alt: "wicker basket of eggs",
  },
  chickens: {
    class: "chickens",
    src: "./images/chickens.jpg",
    alt: "chickens",
  },
  chickensBarn: {
    class: "chickensBarn",
    src: "./images/chickensbarn2.jpg",
    alt: "chickens in a barn door",
  },
  cowNose: {
    class: "cownose",
    src: "../images/chickensbarn2.jpg",
    alt: "cow nose",
  },
  cows: {
    class: "cows",
    src: "./images/cows2.jpg",
    alt: "cows",
  },
  dog: {
    class: "dog",
    src: "./images/dog.jpg",
    alt: "dog",
  },
  ducks: {
    class: "ducks",
    src: "./images/ducks.jpg",
    alt: "ducks",
  },
  goat: {
    class: "goat",
    src: "./images/goat.jpg",
    alt: "goat",
  },
  horses: {
    class: "horses",
    src: "./images/horses.jpg",
    alt: "horses",
  },
  lamb: {
    class: "lamb",
    src: "./images/lamb.jpg",
    alt: "lamb",
  },
  pigs: {
    class: "pigs",
    src: "./images/pigs.jpg",
    alt: "pink pigs",
  },
};

const showCard = (image, row, column) => {
  image.src = board[row][column].src;
};

const hideCards = () => {
  currentTurn.forEach((image) => {
    image.src = Images.barndoor.src;
  });

  currentTurn = [];
};

const flipCard = (event, element) => {
  cardsShown += 1;

  const row = element.getAttribute("data-row");
  const column = element.getAttribute("data-column");

  const image = element.children[0];

  showCard(image, row, column);

  if (currentTurn.length === 1) {
    if (currentTurn[0].src === image.src) {
      currentTurn[0].classList.add("scale");
      image.classList.add("scale");

      pairs += 1;
      currentTurn = [];

      //check to see if you won the game
      if (pairs === totalPairs) {
        const divWon = document.getElementById("won");
        divWon.classList.remove("hidden");
      }
    } else {
        currentTurn.push(image);

        setTimeout(() => {
          hideCards();
        }, 1000);
      }
  } else {
    currentTurn.push(image);
    }

    console.log("Current", currentTurn);
};

const setupHTML = () => {
  const board = document.getElementById("GameBoard");

  //Outer Loop over the rows
  // Inner Loop over the columns

  for (let row = 0; row < rows; row++) {
    const divRow = document.createElement("div");
    divRow.className = "game-row";

    for (let column = 0; column < columns; column++) {
      const cardButton = document.createElement("button");
      cardButton.className = "card";
      cardButton.onclick = flipCard.bind(null, event, cardButton);
      cardButton.setAttribute("data-row", row);
      cardButton.setAttribute("data-column", column);

      const image = document.createElement("img");
      image.className = Images.barndoor.class;
      image.src = Images.barndoor.src;
      image.alt = Images.barndoor.alt;
      image.setAttribute("height", "175px");
      image.setAttribute("width", "125px");

      cardButton.append(image);

      divRow.append(cardButton);
      
    }

      board.append(divRow);
  }

    const gameButton = document.getElementById("game-button");
    gameButton.innerHTML = "Reset Game";
    gameButton.setAttribute("onclick", "ResetGame()");
};

const randomizeCards = () => {
  const map = {
    1:'barn',
    2:'basketOfEggs',
    3:'chickens',
    4:'chickensBarn',
    5:'cownose',
    6:'cows',
    7:'dog',
    8:'ducks',
    9:'goat',
    10:'horses',
    11:'lamb',
    12:'pigs',
  };

  let cowsCount = 0;
  let chickensCount = 0;
  let barnCount = 0;
  let chickensbarnCount = 0;
  let cownoseCount = 0;
  let dogCount = 0;
  let ducksCount = 0;
  let goatCount = 0;
  let horsesCount = 0;
  let lambCount = 0;
  let pigsCount = 0;
  let basketOfEggsCount = 0;

  for (let row = 0; row < rows; row++) {
    const row = [];
    for (let column = 0; column < columns; column++) {
      const random = Math.round(Math.random(2) + 1);
      const image = Images[map[random]];

      if (map[random] === "chicken") {
        if (chickenCount >= 2) {
          cowCount += 1;
          row.push(Images.cow);
        } else {
          chickenCount += 1;
          row.push(Images.chicken);
        }
      } else {
        if (cowsCount >= 2) {
          chickensCount += 1;
          row.push(Images.chicken);
        } else {
          cowsCount += 1;
          row.push(Images.cow);
        }
      }
    }
    board.push(row);
  }
  console.log("BOARD", board);
};

const StartGame = () => {
  randomizeCards();
  setupHTML();
};

const ResetGame = () => {
  const gameBoard = document.getElementById("GameBoard");
  gameBoard.innerHTML = "";
  const divWon = document.getElementById("won");
  divWon.classList.add("hidden");
  StartGame();
};

