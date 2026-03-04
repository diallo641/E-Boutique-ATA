const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authentificationgoogle');

// 🔹 Lancer l'authentification Google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 🔹 Callback après authentification Google
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/failure' }),
  authController.googleCallback
);

// 🔹 Optionnel : route de logout
router.get('/logout', authController.logout);

// 🔹 Route échec authentification
router.get('/failure', (req, res) => {
  res.status(401).json({ message: "Échec de l'authentification Google" });
});

module.exports = router;