$(function() {

  const deck = $('.deck');
  const cards = $('.card');
  const restart = $('#resetGame');
  const movesDiv = $('.moves');
  const close = $(".close-modal");
  const resetBtn = $('#resetBtn');
  const star = $('<li><i class="fa fa-star"></i></li>');
  const TwoStars = $('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
  const tStars = $('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
  const stars = $('.stars');

  let moves = 0;
  let timer = 0;
  let matchedCards = 0;
  let currentCards = [];
  let endTracker = [];

  const endModal = $('.endModal-container');

  // Inertval to keep track of time spent
  function Timer() {
    let tm = $('#time-spot');
    timer++;
    tm.html( timer );
  }

  let myTimer = window.setInterval(Timer, 1000);

  //selectedCard object to handle some basic functions
  const selectedCard = {
    showCard: function(card) {
      return card.addClass('open show');
    },
    hideAll: function(card) {
      return card.removeClass('open show match');
    },
    hideOpen: function(card) {
      return card.removeClass('open show');
    },
    matchCard: function(card) {
      return card.addClass('match');
    }
  }

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
  }

  // Evaluate if the cards match. If they do: add match class to both, place them in a different array for the endgame. Otherwise, show what it is, then after 350ms hide both and empty the current card array
  function checkIfSame(newCard) {
    if (newCard.html() == currentCards[0].html()) {
      selectedCard.matchCard(newCard);
      selectedCard.matchCard(currentCards[0]);
      endTracker.push(newCard, currentCards[0]);
      currentCards = [];
    } else {
      selectedCard.showCard(newCard);
      setTimeout(function() {
        selectedCard.hideOpen(newCard);
        selectedCard.hideOpen(currentCards[0]);
        currentCards = [];
      }, 350);

    }
  }

  // Adding up the moves
  function moveCounter(curCard) {
    if (curCard.hasClass('match')) return;
    else {
      moves++
      movesDiv.html(moves);

      moves > 18 ? stars.html(TwoStars) : stars
      moves > 30 ? stars.html(star) : stars
    }
  }

  // Displays when the game is over. This: stops the timer, tells the user the amount of moves it took, the time they took, and fades the modal containing this information into view.
  function endGame() {
    window.clearInterval(myTimer);
    let endTime = timer;
    let timeHtml = $('#timeLocation');
    let movesHtml = $('#moveLocation');

    movesHtml.html(`You finished the game in ${moves} moves!`);
    timeHtml.html(`It took you ${timer} seconds.`);
    endModal.fadeIn(300);
  }

  // Add listener to any card, if clicked: Adds card to open pile, shows the card clicked, if more than 1 card is in the arr it checks if they match, calls the move counter function, then checks the length of the endTracker's length to see if the game is over.
  deck.on('click', 'li', function() {
    openCards($(this));
    selectedCard.showCard($(this));
    if (currentCards.length > 1) {
      checkIfSame($(this));
    }
    moveCounter($(this));
    if (endTracker.length === 16) return endGame();
  });

  // Reseting the game. This: hides all cards, empties the arrays, sets timer to 0, sets moves to 0, shows 0 in the moves spot, fades the modal out, starts the timer back up.
  function resetGame() {
    window.clearInterval(myTimer);
    selectedCard.hideAll(cards);
    currentCards = [];
    timer = 0;
    moves = 0;
    movesDiv.html(moves);
    endTracker = [];
    endModal.fadeOut(300);
    myTimer = window.setInterval(Timer, 1000);
    stars.html(tStars);
  }

  restart.on('click', resetGame);

  resetBtn.on('click', resetGame);

  close.on('click', function() {
    endModal.fadeOut(300);
  });

});
