const jwt = require('jsonwebtoken');

// 🔹 Callback après authentification Google
const googleCallback = (req, res) => {
  try {
    // passport nous renvoie { user, token }
    const { user, token } = req.user;

    // 🔥 Ici on peut soit :
    // 1️⃣ Renvoyer le token en JSON
    // 2️⃣ Rediriger vers le frontend avec le token

    // ✅ Option simple (API REST)
    return res.status(200).json({
      message: "Authentification Google réussie",
      token,
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de l'authentification Google",
      error: error.message
    });
  }
};


// 🔹 Logout (optionnel si tu utilises JWT côté frontend)
const logout = (req, res) => {
  try {
    // Avec JWT, le logout se fait côté client (suppression du token)
    return res.status(200).json({
      message: "Déconnexion réussie (supprimez le token côté client)"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la déconnexion",
      error: error.message
    });
  }
};


module.exports = {
  googleCallback,
  logout
};