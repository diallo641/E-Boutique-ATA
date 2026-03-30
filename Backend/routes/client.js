const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

// Inscription client frontend
router.post("/inscription", clientController.inscription);
//Routes Admin / Manager / Employe
// Ajouter un client
router.post("/ajouterclient",  authentification, checkrole(['Admin','Manager', 'Employe']), clientController.createclient);

// Lister tous les clients
router.get('/getAllClients', authentification, checkrole(['Admin','Manager', 'Employe']), clientController.getAllClients);

// Récupérer un client par ID
router.get("/unclient/:id",  authentification, checkrole(['Admin','Manager', 'Employe']), clientController.getClientByID);

// Modifier un client
router.put('/editerclient/:id',  authentification,  checkrole(['Admin','Manager', 'Employe']),  clientController.update);

// Supprimer un client
router.delete('/supprimerclient/:id', authentification, checkrole(['Admin','Manager']),  clientController.deleteClient
);

//Routes client connecté (profil)

// Voir son profil
router.get('/profil', authentification, checkrole(['Client']), clientController.getProfile);

// Modifier son profil
router.put('/editerprofil',  authentification, checkrole(['Client']), clientController.updateProfile);



module.exports = router;