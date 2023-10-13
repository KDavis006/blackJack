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
  dealerBoard.push({code: res.data.cards[0].code, value: res.data.cards[0].value, image: res.data.cards[0].image})
  dealerBoard.push({code: res.data.cards[1].code, value: res.data.cards[1].value, image: res.data.cards[1].image})
  dealerCards.innerHTML = `
  <img class="card" src="${res.data.cards[0].image}" alt="${res.data.cards[0].value} of ${res.data.cards[0].suit}">
  <img class="card" src="https://deckofcardsapi.com/static/img/back.png" alt="hidden card">
  `
  })

  const dealerCardValues = ['JACK', 'QUEEN', 'KING', 'ACE'];
  const dealerHasFaceCardAndAce = (
    (dealerCardValues.includes(dealerBoard[0].value) && dealerBoard[1].value === 'ACE') ||
    (dealerCardValues.includes(dealerBoard[1].value) && dealerBoard[0].value === 'ACE')
  );

  if (dealerHasFaceCardAndAce) {
    endGame();
    return
  }

  const playerCardValues = ['JACK', 'QUEEN', 'KING', 'ACE'];
  const playerHasFaceCardAndAce = (
    (playerCardValues.includes(playerBoard[0].value) && playerBoard[1].value === 'ACE') ||
    (playerCardValues.includes(playerBoard[1].value) && playerBoard[0].value === 'ACE')
  );

  if (playerHasFaceCardAndAce) {
    endGame();
    return
  }
}
startGame();



async function playerHit() {
  await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
  .then((res) => {
   playerBoard.push({code: res.data.cards[0].code, value: res.data.cards[0].value})
   playerCards.innerHTML += `<img class="card" src="${res.data.cards[0].image}" alt="${res.data.cards[0].name}">`
  })

  let cardValue = 0
  playerBoard.map((x) => {

    if (x.value == 'JACK' || x.value == 'QUEEN' || x.value == 'KING') {
      cardValue += 10
    } else if (x.value != 'ACE') {
      cardValue += x.value
    } else if (cardValue >= 11) {
      cardValue += 1
    } else {
      cardValue += 11
    } 

  })
  if (cardValue > 21) {
      playerLose()
      return
    }

    if(playerBoard.length == 5) {
      playerWin()
      return
    }

}

async function dealerHit() {
  await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
  .then((res) => {
   dealerBoard.push({code: res.data.cards[0].code, value: res.data.cards[0].value})
   dealerCards.innerHTML += `<img class="card" src="${res.data.cards[0].image}" alt="${res.data.cards[0].name}">`
  })

  let cardValue = 0
  dealerBoard.map((x) => {
    if (x.value == 'JACK' || x.value == 'QUEEN' || x.value == 'KING') {
      cardValue += 10
    } else if (x.value != 'ACE') {
      cardValue += parseInt(x.value)
    } else if (cardValue >= 11) {
      cardValue += 1
    } else {
      cardValue += 11
    } 
  })
  if (cardValue > 21) {
      playerWin()
      return
    }

    if(dealerBoard.length == 5) {
      playerLose()
      return
    }
  endGame()
}


async function endGame() {
  let playerValue = 0
  let dealerValue = 0
  if (dealerBoard.length == 2){
    dealerCards.innerHTML = `
    <img class="card" src="${dealerBoard[0].image}">
    <img class="card" src="${dealerBoard[1].image}">`
  }

  playerBoard.map((x) => {
      if (x.value == 'ACE'){
        x.value = 11
      }
  })

  console.log(playerBoard)

  playerBoard.sort((a, b) => {
    return a.value - b.value
  })

  console.log(playerBoard)


  playerBoard.map((x) => {
    if (x.value == 'JACK' || x.value == 'QUEEN' || x.value == 'KING') {
      playerValue += 10
    } else if (x.value == Number) {
      playerValue += x.value
    } else if (playerValue >= 11) {
      x.value = 1
      playerValue += 1
    } else {
      playerValue += 11
    } 
  })
  
  console.log(`Player Value: ${playerValue}`)

  if (playerValue > 21) {
      playerLose()
      return
    }

  if(playerBoard.length == 5) {
      playerWin()
      return
  }

  dealerBoard.map((x) => {
      if (x.value == 'ACE'){
        x.value = 11
      }
  })

  dealerBoard.sort((a, b) => {
    return a.value - b.value
  })

  dealerBoard.map((x) => {
    if (x.value == 'JACK' || x.value == 'QUEEN' || x.value == 'KING') {
      x.value = 10
    } else if (x.value != '11') {
      x.value = parseInt(x.value)
      dealerValue += x.value
    } else if (dealerValue >= 11) {
      x.value = 1
      dealerValue += x.value
    } else {
      x.value = 11
      dealerValue += x.value
    } 
  })
  console.log(`Dealer Value: ${dealerValue}`)
  if (dealerValue > 21) {
    playerWin()
    return
  }

  if(dealerBoard.length == 5) {
    playerLose()
    return
  }


  if(dealerValue < 17) {
    console.log('Dealer Hits')
    dealerHit()
  } else if (dealerValue < playerValue) {
    playerWin()
    return
  } else if (dealerValue == playerValue) {
    tie()
    return
  } else if (dealerValue > playerValue) {
    playerLose()
    return
  }

}


async function playerWin() {
  console.log('Player Wins')
}


async function playerLose() {
  console.log('Player Lose')
}


async function tie() {
  console.log("It's a Tie")
}