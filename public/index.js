const topWinners = document.querySelector('.top-winners'); // Use the correct selector for your HTML element

const topWins = async () => {
  try {
  await axios.get('/api/people') // Use the correct route to retrieve top winners
  .then((response) => {
    console.log(response)
    topWinners.innerHTML = `
    <span><h1>#1 - ${response[0].firstName}:    ${response[0].wins}</h1></span>
    <span><h1>#2 - ${response[1].firstName}:    ${response[1].wins}</h1></span>
    <span><h1>#3 - ${response[2].firstName}:    ${response[2].wins}</h1></span>
    <span><h1>#4 - ${response[3].firstName}:    ${response[3].wins}</h1></span>
    <span><h1>#5 - ${response[4].firstName}:    ${response[4].wins}</h1></span>
    <span><h1>#6 - ${response[5].firstName}:    ${response[5].wins}</h1></span>
    <span><h1>#7 - ${response[6].firstName}:    ${response[6].wins}</h1></span>
    <span><h1>#8 - ${response[7].firstName}:    ${response[7].wins}</h1></span>
    <span><h1>#9 - ${response[8].firstName}:    ${response[8].wins}</h1></span>
    <span><h1>#10 - ${response[9].firstName}:    ${response[9].wins}</h1></span>
    `
  });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to load the top winners
topWins();