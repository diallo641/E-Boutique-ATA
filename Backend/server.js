// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); 
dotenv.config();
const app = express();
const roleRoutes = require('./routes/role');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// Route test
app.get("/", (req, res) => {
  res.send("✅ API fonctionne !");
});
// Importer les routes
app.use('/api/roles', roleRoutes);

// Test connexion à la base au démarrage
db.getConnection()
  .then(() => console.log("✅ Connecté à MySQL"))
  .catch(err => console.error("❌ Erreur de connexion MySQL:", err));

// Définir le port
const port = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Le serveur API a démarré avec succès sur le port ${port}`);
});
