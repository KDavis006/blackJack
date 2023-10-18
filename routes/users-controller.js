const express = require('express')
const router = express.Router()
const {getOneUser, getAllUsers, updateUser} = require('../controllers/users')

router.route('/').get(getAllUsers)
router.route('/:id').get(getOneUser).put(updateUser)

module.exports = router;