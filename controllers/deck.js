let res = []

const createDeck = async () => {
let cards = ["H", "D", "C", "S"]; 
let values = [ 
	"A","K","Q","J", 
	"2", "3", "4", "5", "6", 
	"7", "8", "9", "10", 
]; 

res = []

for (let card in cards) { 
	for (let value in values) { 
		res.push(cards[card] + values[value]);  
	} 
} 
console.log(res); 
}

const shuffleDeck = async () => {
 for (let i = res.length - 1; i > 0; i--) { 
    let j = Math.floor(Math.random() * (i + 1)); 
    [res[i], res[j]] = [res[j], res[i]]; 
} 
  
console.log(res); 
}

const drawCard = async () => {
 let card = res.shift(); 
 return card;
}

createDeck();
shuffleDeck();
console.log(drawCard())

module.exports = {createDeck, shuffleDeck, drawCard}
