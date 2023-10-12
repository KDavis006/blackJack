const dealerCards = document.querySelector('.dealerContainer');
const playerCards = document.querySelector('.playerContainer');

const dealerBoard = []
const playerBoard = []

let createShuffledDeck;

let deck_id;

const startGame = async (req, res) => {

 createShuffledDeck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')

 deck_id = createShuffledDeck.data.deck_id

 await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
 .then((res) => {
  const playerDraw = res.data.cards.map((x) => {
   playerBoard.push({code: x.code, value: x.value})
  return `
  <img class="card" src="${x.image}" alt="${x.name}">
  `
  })
    playerCards.innerHTML += playerDraw.join('')
 })

 await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
 .then((res) => {
  console.log(res.data.cards)
  dealerBoard.push({code: res.data.cards[0].code, value: res.data.cards[0].value})
  dealerBoard.push({code: res.data.cards[1].code, value: res.data.cards[1].value})
  dealerCards.innerHTML = `
  <img class="card" src="${res.data.cards[0].image}" alt="${res.data.cards[0].value} of ${res.data.cards[0].suit}">
  <img class="card" src="https://deckofcardsapi.com/static/img/back.png" alt="hidden card">
  `
  })

  dealerBoard.map((x) => {
    if (playerBoard[0].value == 'JACK' && playerBoard[1] == 'ACE'  || playerBoard[0].value == 'QUEEN' && playerBoard[1] == 'ACE' || playerBoard[0].value == 'KING' && playerBoard[1] == 'ACE' || playerBoard[0].value == 'ACE' && playerBoard[1] == 'KING' || playerBoard[0].value == 'ACE' && playerBoard[1] == 'QUEEN' || playerBoard[0].value == 'ACE' && playerBoard[1] == 'JACK') {
      endGame()
    }
  })

  playerBoard.map((x) => {
    let cardValue = 0
    if (playerBoard[0].value == 'JACK' && playerBoard[1] == 'ACE'  || playerBoard[0].value == 'QUEEN' && playerBoard[1] == 'ACE' || playerBoard[0].value == 'KING' && playerBoard[1] == 'ACE' || playerBoard[0].value == 'ACE' && playerBoard[1] == 'KING' || playerBoard[0].value == 'ACE' && playerBoard[1] == 'QUEEN' || playerBoard[0].value == 'ACE' && playerBoard[1] == 'JACK') {
      endGame()
    }
    if (x.value == 'JACK' || x.value == 'QUEEN' || x.value == 'KING') {
      x.value = 10
    } else if (x.value != 'ACE') {
      x.value = parseInt(x.value)
      cardValue += x.value
    } else if (cardValue >= 11) {
      x.value = 1
      cardValue += x.value
    } else {
      x.value = 11
      cardValue += x.value
    } 
    if (cardValue > 21) {
      playerLose()
    } else if (cardValue == 21) {
      endGame()
    } else {
      return
    }
  })
  
 }
startGame();



async function playerHit() {
  await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
  .then((res) => {
   playerBoard.push({code: res.data.cards[0].code, value: res.data.cards[0].value})
   playerCards.innerHTML += `<img class="card" src="${res.data.cards[0].image}" alt="${res.data.cards[0].name}">`
  })

  playerBoard.map((x) => {
    let cardValue = 0
    if (x.value == 'JACK' || x.value == 'QUEEN' || x.value == 'KING') {
      x.value = 10
    } else if (x.value != 'ACE') {
      x.value = parseInt(x.value)
      cardValue += x.value
    } else if (cardValue >= 11) {
      x.value = 1
      cardValue += x.value
    } else {
      x.value = 11
      cardValue += x.value
    } 
    if (cardValue > 21) {
      playerLose()
    } else {
      return
    }

    if(playerBoard.length == 5) {
      playerWin()
    }

  })
  console.log(playerBoard)
}

async function dealerHit() {}


async function endGame() {}


async function playerWin() {}


async function playerLose() {}