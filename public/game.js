const dealerCards = document.querySelector('.dealerContainer');
const playerCards = document.querySelector('.playerContainer');

const dealerBoard = []
const playerBoard = []

let createShuffledDeck;
let deck_id;

const startGame = async () => {
  createShuffledDeck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
  deck_id = createShuffledDeck.data.deck_id;

  await drawInitialCards(playerBoard, playerCards, 2);
  await drawInitialCards(dealerBoard, dealerCards, 2, true);

  if (isFaceCardAndAce(dealerBoard) || isFaceCardAndAce(playerBoard)) {
    endGame();
  }
};

const drawInitialCards = async (board, container, count, hideSecondCard = false) => {
  const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`);
  const cards = res.data.cards;

  board.push(...cards.map(card => ({ code: card.code, value: card.value, image: card.image })));

  const cardImages = cards.map(card => `<img class="card" src="${card.image}" alt="${card.name}">`);
  if (hideSecondCard && count === 2) {
    cardImages[1] = '<img class="card" src="https://deckofcardsapi.com/static/img/back.png" alt="hidden card">';
  }

  container.innerHTML += cardImages.join('');
};

const isFaceCardAndAce = (board) => {
  const values = ['JACK', 'QUEEN', 'KING', 'ACE'];

  return (
    (values.includes(board[0].value) && board[1].value === 'ACE') ||
    (values.includes(board[1].value) && board[0].value === 'ACE')
  );
};

const playerHit = async () => {
  await drawInitialCards(playerBoard, playerCards, 1);

  if (calculateHandValue(playerBoard) > 21 || playerBoard.length === 5) {
    playerLose();
    return
  }
};

const dealerHit = async () => {
  await drawInitialCards(dealerBoard, dealerCards, 1);

  if (calculateHandValue(dealerBoard) > 21 || dealerBoard.length === 5) {
    playerWin();
    return
  } else if (calculateHandValue(dealerBoard) < 17) {
    dealerHit();
    return
  } else {
    endGame();
    return
  }
};

const calculateHandValue = (hand) => {
  let value = 0;
  const cardValues = hand.map(card => card.value);

  for (const card of cardValues) {
    if (['JACK', 'QUEEN', 'KING'].includes(card)) {
      value += 10;
    } else if (card !== 'ACE') {
      value += parseInt(card);
    } else if (value >= 11) {
      value += 1;
    } else {
      value += 11;
    }
  }

  return value;
};

const endGame = () => {
  const playerValue = calculateHandValue(playerBoard);
  const dealerValue = calculateHandValue(dealerBoard);

  if (dealerBoard.length === 2) {
    dealerCards.innerHTML = `<img class="card" src="${dealerBoard[0].image}"><img class="card" src="${dealerBoard[1].image}">`;
  }

  if (playerValue > 21) {
    playerLose();
  } else if (dealerValue > 21 || (dealerValue < 17 && dealerValue < playerValue)) {
    playerWin();
  } else if (playerValue === dealerValue) {
    tie();
  } else {
    playerLose();
  }
};


const showDelayedAlert = (message, delayInSeconds) => {
  setTimeout(() => {
    window.alert(message);
  }, delayInSeconds * 1000); // Convert seconds to milliseconds
};

const playerWin = () => {
  showDelayedAlert('Congratulations! You win!', .5);
};

const playerLose = () => {
  showDelayedAlert('Sorry, you lose.', .5);
};

const tie = () => {
  showDelayedAlert("It's a Tie! The game is a draw.", .5);
};

startGame();
