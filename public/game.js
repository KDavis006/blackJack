const dealerCards = document.querySelector('.dealerContainer');
const playerCards = document.querySelector('.playerContainer');

const dealerBoard = []
const playerBoard = []

const startGame = async (req, res) => {
 const createShuffledDeck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
 console.log(createShuffledDeck)
 let deck_id = createShuffledDeck.data.deck_id


 await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
 .then((res) => {
  const playerDraw = res.data.cards.map((x) => {
   playerBoard.push({code: x.code, value: x.value})
  return `
  <img class="card" src="${x.image}" alt="${x.name}">
  `
  })
    playerCards.innerHTML = playerDraw.join('')
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
  
 }
startGame();

