const express = require('express')
const router = express.Router()
const {createDeck, shuffleDeck, drawCard} = require('../controllers/deck')

router.route('/').post(createDeck).put(shuffleDeck)
router.route('/:id').put(drawCard)

module.exports = router;