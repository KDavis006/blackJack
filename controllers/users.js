const user = require('../models/Users');

const getAllUserStats = async (req, res) => {
  const {id: idUser} = req.params
  let answer = await user.find({id: idUser})
  res.json(answer)
}

const getTopWins = async (req, res) => {
    const topUsers = await User.find().sort({ wins: -1 }).limit(10);
    res.json(topUsers);
}

module.exports = {getAllUserStats, getTopWins}
