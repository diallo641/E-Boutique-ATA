// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); 
dotenv.config();

const app = express();

// Routes existantes
const roleRoutes = require('./routes/role');
const compteRoutes= require("./routes/compte");
const clientRoutes = require('./routes/client');
const boutiqueRoutes = require('./routes/boutique');
const categorieRoutes = require('./routes/categorie');
const produitRoutes = require('./routes/produit');
const stockRoutes = require('./routes/stock');
const employeRoutes = require('./routes/employe');
const managerRoutes= require('./routes/manager');
const commandeRoutes= require('./routes/commande');
const detailRoutes = require('./routes/details_commande');
const authentificationRoutes = require('./routes/authentification');

// -------------------
// Passport & Google OAuth
// -------------------
const passport = require('./config/passport'); // fichier qu'on vient de créer
const session = require('express-session');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session obligatoire pour Passport
app.use(session({
    secret: process.env.JWT_SECRET, // tu peux réutiliser la même clé
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// -------------------
// Routes OAuth Google
// -------------------

// Lancer l'authentification Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback après l'authentification Google
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        // Ici tu peux créer un token JWT pour ton utilisateur ou rediriger
        res.json({ message: "Authentification réussie", user: req.user });
    }
);

// Route échec OAuth
app.get('/auth/failure', (req, res) => {
    res.status(401).json({ message: "Échec de l'authentification Google" });
});

// -------------------
// Routes API existantes
// -------------------
app.get("/", (req, res) => res.send("✅ API fonctionne !"));
app.use('/api/roles', roleRoutes);
app.use("/api/comptes", compteRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/boutiques", boutiqueRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/produits", produitRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/employes", employeRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/commandes", commandeRoutes);
app.use('/api/details', detailRoutes);
app.use('/api/authentification', authentificationRoutes);


// Test connexion MySQL
db.getConnection()
  .then(() => console.log("✅ Connecté à MySQL"))
  .catch(err => console.error("❌ Erreur de connexion MySQL:", err));

// Port
const port = process.env.PORT || 3000;
//Demarage du server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Serveur API démarré sur le port ${port}`);
  
})