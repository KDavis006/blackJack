const dealerCards = document.querySelector('.dealerContainer');
const playerCards = document.querySelector('.playerContainer');

const startGame = async (req, res) => {
 const createShuffledDeck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')

 let deck_id = createShuffledDeck.data.deck_id


 await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
 .then((res) => {
  const playerDraw = res.data.cards.map((x) => {
  return `
  <img class="card" src="${x.image}" alt="${x.name}">
  `
  })
    playerCards.innerHTML = playerDraw.join('')
 })

 await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
 .then((res) => {
  console.log(res)
  const dealerDraw = res.data.cards.map((x) => {
  return `
  <img class="card" src="${x.image}" alt="${x.name}">
  `
  })
  dealerCards.innerHTML = dealerDraw.join('')

 })
}
startGame();