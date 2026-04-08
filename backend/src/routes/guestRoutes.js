const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

router.post('/confirm', guestController.confirmPresence);
router.get('/list', guestController.getAllGuests);

module.exports = router;
