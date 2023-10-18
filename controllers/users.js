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
  console.log('this is running')
  const {email: email} = req.params
  let answer = await users.find({email: email})
  console.log(answer);
  res.json(answer)
}

const updateUser = async(req, res) => {
  try {
  console.log(req.body)
  const {email: email} = req.params
  let answer = await users.findOneAndUpdate({email: email}, req.body, {
    new: true, 
    runValidators: true
  })
  console.log(answer)
  res.json(answer)
} catch (err) {}
}

module.exports = {getOneUser, getAllUsers, updateUser}