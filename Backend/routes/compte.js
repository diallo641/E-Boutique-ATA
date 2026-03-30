const express = require('express');
const router = express.Router();
const compteController = require("../controllers/compte");
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');
//Ajouter un compte 
router.post('/ajouter', authentification, checkrole(['Admin','Manager']), compteController.createCompte);
//Tous les comptes
router.get("/getAllComptes", authentification, checkrole(['Admin']), compteController.getAllComptes);
//Un seul compte
router.get("/uncompte/:id", authentification, checkrole(['Admin','Manager']), compteController.getCompteByID);
//Modifier un compte 
router.put("/editercompte/:id", authentification, checkrole(['Admin']), compteController.updateCompte);
//Supprimer un compte 
router.delete("/deletecompte/:id", authentification, checkrole(['Admin']), compteController.deleteCompte);

// Route publique pour réinitialisation mot de passe
router.post('/reinitialiser', compteController.reinitialiserMotDePasse);


module.exports= router;