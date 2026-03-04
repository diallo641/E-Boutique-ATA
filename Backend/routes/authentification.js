const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentification');

// Route de connexion
router.post('/login', authController.connexion);

module.exports = router;