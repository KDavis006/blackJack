const users = require('../models/user');


const getAllUsers = async(req, res) => {
try {
  let answer = await users.find({})
  console.log(answer);
  res.status(200).json({answer})
} catch (err) {

}
}

const getOneUser = async (req, res) => {
  const {id: id} = req.params
  let answer = await users.find({id: id})
  console.log(answer);
  res.json(answer)
}

const updateUser = async(req, res) => {
  try {
  console.log(req.body)
  const {id: id} = req.params
  let answer = await users.findOneAndUpdate({id: id}, req.body, {
    new: true, 
    runValidators: true
  })
  console.log(answer)
  res.json(answer)
} catch (err) {}
}

module.exports = {getOneUser, getAllUsers, updateUser}