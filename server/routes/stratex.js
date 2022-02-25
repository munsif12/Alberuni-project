const express = require('express')
const router = express.Router()
const { stratex, stratexAdd, stratexDelete } = require('../controllers/stratex')


router.get('/stratex', stratex)
router.post('/stratex-add', stratexAdd)
router.delete("/stratex-remove", stratexDelete);

module.exports = router