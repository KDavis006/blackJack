const topWinners = document.querySelector('top-winners');

const topWins = async() => {
 axios.get('/api/users')
  .then(response => {
   const data = response.data;
   data.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} - Wins: ${user.wins}`;
    topWinners.appendChild(li);
   });
  })
  .catch(error => {
   console.error('Error fetching data:', error);
  });
}