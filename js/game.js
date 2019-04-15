////Variables
//Declares all cards as letiables and then declares the cards into an array
let card = document.getElementsByClassName("card");
let cards = [...card];
// deck of all cards in game
const deck = document.getElementById("card_deck");
// declaring letiable of matchedCards
let matchedCard = document.getElementsByClassName("match");
// array for opened cards
let openedCards = [];
// declare modal
let modal = document.getElementById("popup1");
// close icon in modal
let closeicon = document.querySelector(".close");
// declare letiables for star icons
const stars = document.querySelectorAll(".fa-star");
// declares moves letiable and sets to 0
let moves = 0;
// moves element from HTML set as counter letiable
let counter = document.querySelector(".moves");
// Game Timer Variables
let second = 0, minute = 0; hour = 0;
let timer = document.querySelector(".timer");
let interval;


////RESETS THE GAME////
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   let currentIndex = array.length, temporaryValue, randomIndex;

   while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }

   return array;
}
//Function to start new game
function startGame() {
   //Fixes restart button bug
   openedCards = [];
   // shuffle deck
   cards = shuffle(cards);
   // remove all exisiting classes from each card
   for (let i = 0; i < cards.length; i++) {
      deck.innerHTML = "";
      [].forEach.call(cards, function (item) {
         deck.appendChild(item);
      });
      cards[i].classList.remove("show", "open", "match", "disabled");
   }
   // reset rating
   for (let i = 0; i < stars.length; i++) {
      stars[i].style.color = "#FFD700";
      stars[i].style.visibility = "visible";
   }
   // reset moves
   moves = 0;
   counter.innerHTML = moves;
   //reset timer
   second = 0;
   minute = 0;
   hour = 0;
   let timer = document.querySelector(".timer");
   timer.innerHTML = "0 mins 0 secs";
   clearInterval(interval);
   startTimer();
}
//Shuffles cards when the page is loaded or refreshed
document.body.onload = startGame();


////Timer////
//Timer counts in seconds and goes into minute/hour
function startTimer() {
   interval = setInterval(function () {
      timer.innerHTML = minute + "mins " + second + "secs";
      second++;
      //converts  seconds to minutes
      if (second == 60) {
         minute++;
         second = 0;
      }
      //converts minutes to hours
      if (minute == 60) {
         hour++;
         minute = 0;
      }
   }, 1000);
}


////CLICK FUNCTIONALITY////
//Function toggles open, show, and disabled classes
let displayCard = function () {
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
};


////MATCHING FUNCTIONALITY////
//Adds opened cards to a list and checks if they match or not
function cardOpen() {
   openedCards.push(this);
   let len = openedCards.length;
   setTimeout(function () {
      if (len === 2) {
         moveCounter();
         if (openedCards[0].type === openedCards[1].type) {
            matched();
         } else {
            unmatched();
         }
      }
   }, 350);
};
//When cards match
function matched() {
   openedCards[0].classList.add("match", "disabled");
   openedCards[1].classList.add("match", "disabled");
   openedCards[0].classList.remove("show", "open", "no-event");
   openedCards[1].classList.remove("show", "open", "no-event");
   openedCards = [];
}
//When cards do not match
function unmatched() {
   openedCards[0].classList.add("unmatched");
   openedCards[1].classList.add("unmatched");
   disable();
   //timeout gives time for animations
   setTimeout(function () {
      openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
      openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
      enable();
      openedCards = [];
   }, 750);
}
//Disables cards to prevent double clicking
function disable() {
   Array.prototype.filter.call(cards, function (card) {
      card.classList.add('disabled');
   });
}
//Removes the disabled element from cards
function enable() {
   Array.prototype.filter.call(cards, function (card) {
      card.classList.remove('disabled');
      for (let i = 0; i < matchedCard.length; i++) {
         matchedCard[i].classList.add("disabled");
      }
   });
}


////MOVE COUNTER////
//funtion to count moves
function moveCounter() {
   moves++;
   counter.innerHTML = moves;
   // setting rates based on moves
   if (moves > 12 && moves < 20) {
      for (i = 0; i < 3; i++) {
         if (i > 1) {
            stars[i].style.visibility = "collapse";
         }
      }
   }
   else if (moves > 20) {
      for (i = 0; i < 3; i++) {
         if (i > 0) {
            stars[i].style.visibility = "collapse";
         }
      }
   }
}


////WIN CONDITION AND MODAL////
//Reveals when all cards match
function winScreen() {
   setTimeout(function () {
      //only will show if all cards match
      if (matchedCard.length == 16) {
         clearInterval(interval);
         finalTime = timer.innerHTML;

         // show congratulations modal
         modal.classList.add("show");

         // declare star rating letiable
         let starRating = document.querySelector(".stars").innerHTML;

         //showing move, rating, time on modal
         document.getElementById("finalMove").innerHTML = moves;
         document.getElementById("starRating").innerHTML = starRating;
         document.getElementById("totalTime").innerHTML = finalTime;

         //closeicon on modal
         removeModal();
      };
   }, 1000)
}
//Funtion remove modal and resets game when close icons is clicked
function removeModal() {
   closeicon.addEventListener("click", function (e) {
      modal.classList.remove("show");
      startGame();
   });
}
//Funtion removes modal and resets the game when 'play again' is clicked
function playAgain() {
   modal.classList.remove("show");
   startGame();
}



//Loop to add event listeners to each card
for (let i = 0; i < cards.length; i++) {
   card = cards[i];
   card.addEventListener("click", displayCard);
   card.addEventListener("click", cardOpen);
   card.addEventListener("click", winScreen);
};