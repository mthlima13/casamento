const express = require('express');
const router = express.Router();
const guestRoutes = require('./guestRoutes');

router.use('/guests', guestRoutes);

module.exports = router;
