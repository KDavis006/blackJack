const express = require('express')
const router = express.Router()
const {getAllUserStats, getTopWins} = require('../controllers/users')

router.route('/').get(getTopWins)
router.route('/:id').get(getAllUserStats)

module.exports = router;