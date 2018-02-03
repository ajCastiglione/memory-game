$(function() {

  const deck = $('.deck');
  const cards = $('.card');
  const restart = $('#resetGame');
  const movesDiv = $('.moves');
  const close = $(".close-modal");
  const resetBtn = $('#resetBtn');
  const star = $('<li><i class="fa fa-star"></i></li>');
  const TwoStars = $('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
  const stars = $('.stars');

  let moves = 0;
  let timer = 0;
  let matchedCards = 0;
  let currentCards = [];
  let endTracker = [];

  const endModal = $('.endModal-container');

  // Inertval to keep track of time spent
  function Timer() {
    timer++;
  }

  let myTimer = window.setInterval(Timer, 1000);

  //selectedCard object to handle functions
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

  function checkIfSame(newCard) {
    if (newCard.html() == currentCards[0].html()) {
      selectedCard.matchCard(newCard);
      selectedCard.matchCard(currentCards[0]);
      endTracker.push(newCard, currentCards[0]);
      currentCards = [];
    } else {
      selectedCard.show(newCard);
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

      moves > 12 ? stars.html(TwoStars) : stars
      moves > 20 ? stars.html(star) : stars
    }
  }

  // Displays when the game is over
  function endGame() {
    window.clearInterval(myTimer);
    let endTime = timer;
    let timeHtml = $('#timeLocation');
    let movesHtml = $('#moveLocation');

    movesHtml.html(`You finished the game in ${moves} moves!`);
    timeHtml.html(`It took you ${timer} seconds.`);
    endModal.fadeIn(300);
  }

  // Event listener for a card being clicked on
  deck.on('click', 'li', function() {
    openCards($(this));
    selectedCard.show($(this));
    if (currentCards.length > 1) {
      checkIfSame($(this));
    }
    moveCounter($(this));
    if (endTracker.length === 16) return endGame();
  });

  // reseting the Game
  function resetGame() {
    selectedCard.hideAll(cards);
    currentCards = [];
    timer = 0;
    moves = 0;
    movesDiv.html(moves);
    endTracker = [];
    endModal.fadeOut(300);
    myTimer = window.setInterval(Timer, 1000);
  }

  restart.on('click', resetGame);

  resetBtn.on('click', resetGame);

  close.on('click', function() {
    endModal.fadeOut(300);
  });

});
