const express = require('express')
const router = express.Router()
const {getOneUser, getAllUsers, updateUser} = require('../controllers/users')

console.log('yay')

router.route('/').get(getAllUsers)
router.route('/:email').get(getOneUser).put(updateUser)

module.exports = router;