const user = require('../models/Users');

const getAllUserStats = async (req, res) => {
  const {id: idUser} = req.params
  let answer = await user.find({id: idUser})
  res.json(answer)
}

module.exports = {getAllUserStats}
