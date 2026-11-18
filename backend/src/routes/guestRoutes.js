const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

// Valida a chave de admin enviada no header 'x-admin-key'
const requireAdminKey = (req, res, next) => {
    const adminKey = process.env.ADMIN_KEY;
    if (!adminKey) {
        console.error('ADMIN_KEY não configurada no servidor.');
        return res.status(500).json({ message: 'Servidor mal configurado.' });
    }
    if (req.headers['x-admin-key'] !== adminKey) {
        return res.status(401).json({ message: 'Não autorizado.' });
    }
    next();
};

router.post('/confirm', guestController.confirmPresence);
router.get('/list', requireAdminKey, guestController.getAllGuests);

module.exports = router;
