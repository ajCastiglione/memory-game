/*
 * Create a list that holds all of your cards
 */
const deck = $('.deck');
const cards = $('.card');
const restart = $('#resetGame');
let timer = 0;
let currentCards = [];
// Inertval to keep track of time spent

/*setInterval(function() {
  timer++;
}, 1000);*/


//card object to handle functions

const selectedCard = {
  show: function(card) {
    return card.addClass('open show');
  },
  hideAll: function(card) {
    return card.removeClass('open show match');
  },
  hideOpen: function(card) {
    return card.removeClass('open show');
  },
  match: function(card) {
    return card.addClass('match');
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(cards); // randomizing the cards locations
deck.empty(); // emptying the deck
deck.html(cards); // inserting the new order of cards into the deck

function openCards(currentCard) {
  if (currentCard.hasClass('open') || currentCard.hasClass('match')) return false;
  currentCards.push(currentCard);
  console.log(currentCards);
}

function checkIfSame(newCard) {

  console.log('running check function');
  if (newCard.html() == currentCards[0].html()) {
    console.log('They match');
    selectedCard.match(newCard);
    selectedCard.match(currentCards[0]);
    currentCards = [];
  }

  else {
    selectedCard.show(newCard);
    setTimeout(function() {
      selectedCard.hideOpen(newCard);
      selectedCard.hideOpen(currentCards[0]);
      currentCards = [];
    }, 500);

  }

}

// Event listener for a card being clicked
deck.on('click', 'li', function() {
  openCards($(this));
  selectedCard.show($(this));
  if (currentCards.length > 1) {checkIfSame($(this));}
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) - done
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


restart.on('click', function() {
  selectedCard.hideAll(cards);
  currentCards = [];
  timer = 0;
});
