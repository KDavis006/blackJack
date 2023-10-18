$(function(){
  $('#profile').on('click', function(){
   $(`.pop-profile`).css({"display": "flex"},2000);
  })
 })
 $(function(){
  $('#scoreboard').on('click', function(){
   $(`.pop-scoreboard`).css({"display": "flex"},2000);
  })
 })
 $(function(){
  $('#leave1').on('click', function(){
   $(`.pop-profile`).css({"display": "none"},2000);
  })
 })
 $(function(){
  $('#leave2').on('click', function(){
   $(`.pop-scoreboard`).css({"display": "none"},2000);
  })
 })
const topWinners = document.querySelector('.top-winners'); // Use the correct selector for your HTML element

const topWins = async () => {
  try {
    await axios.get('/scoreboard')
    .then((users) => {
      console.log(users)
      let usersData = users.find({}).sort({ wins: -1 });
      console.log('why')

      // Create a scoreboard array with the desired format
      const scoreboard = usersData.map((user, index) => {
        const position = index + 1;
        return `#${position} ${user.first_name}: ${user.wins}`;
      })
      .catch((error) => { console.log(error) });

      topWinners.innerHTML = scoreboard.join('')
    });
  } catch (err) {
  } 
};

const playerName = document.querySelector('.name')
const playerWins = document.querySelector('.wins')
const playerLosses = document.querySelector('.losses')
const playerTies = document.querySelector('.ties')
const playerWinStreak = document.querySelector('.winstreak')

const profile = async () => {
  console.log(user.email)
  try {
    fetch(`/scoreboard/${user.email}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: playerName, wins: playerWins, losses: playerLosses, ties: playerTies, MaxWinStreak: playerWinStreak})
    })
  } catch (err) {}
}