const express = require('express')
const router = express.Router()
const {getAllUserStats} = require('../controllers/users')

router.route('/:id').get(getAllUserStats)

module.exports = router;