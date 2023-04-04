var count ;
class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
  }

  startGame() {
    document.getElementById("start").classList.add("visible");
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.busy = true;
    var count = 0;

    setTimeout(() => {
      this.shuffleCards();
      this.countDown = this.startCountdown();
      this.busy = false;
    }, 500);

    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }
  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");     
    });
  }

  flipCard(card) {
    let canFlip = this.canFlipCard(card);
    if (canFlip){
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      this.flip();
      card.classList.add("visible");

      if (this.cardToCheck) this.checkForCardMatch(card);
      else this.cardToCheck = card;
    }
  }
  

flip() {
  // document.getElementById("img1").src="./images/chickensbarn2.jpg";
}

  checkForCardMatch(card) {
    let card1 = this.getCardType(card);
    let card2 = this.getCardType(this.cardToCheck);
    console.log(card1, card2)
    if (card1 === card2){
      this.cardMatch(card, this.cardToCheck);
    }
    else this.cardMismatch(card, this.cardToCheck);

    this.cardToCheck = null;
  }

  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");
    if (this.matchedCards.length === this.cardsArray.length) this.victory();
  }

  cardMismatch(card1, card2) {
    console.log("card mismatch")
    this.busy = true;
    resetCard();
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
      
    }, 1000);
  }

  getCardType(card) {
    // return card.getElementsByClassName("card-front")[0].src;
    let cardName = "frontimg_" + count;
    console.log(cardName);
    return document.getElementById(cardName).src;

  }

  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) this.gameOver();
    }, 1000);
  }

  gameOver() {
    clearInterval(this.countDown);
    document.getElementById("game-over-text").classList.add("visible");
    this.hideCards();
  }

  victory() {
    clearInterval(this.countDown);
    document.getElementById("victory-text").classList.add("visible");
    this.hideCards();
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      this.cardsArray[randIndex].style.order = i;
      this.cardsArray[i].style.order = randIndex;
    }
  }

  canFlipCard(card) {
    return (
      !this.busy && 
      !this.matchedCards.includes(this.cardsArray) && 
      card !== this.cardToCheck);
  }
}

// function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));
  let game = new MixOrMatch(100, cards);
   game.startGame();
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
     
    });
  });
  
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      console.log("Card Click")
      game.flipCard(card);
    });
  });
// }

// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   ready();
// }

function onclickimg(numCard){
    count = numCard;
    console.log("click", numCard);
    let imageClass = "backimg_" + numCard;
    document.getElementById(imageClass).className="clickCard";
    let frontimg ="frontimg_" + numCard;
    document.getElementById(frontimg).className="card-front";
    
  }

  function resetCard(){
    console.log('reset');
    for(let i = 0; i < 16; i++) {
      let imgClass = "backimg_" + i;
      document.getElementById(imgClass).className="cardReset";
    }
  }