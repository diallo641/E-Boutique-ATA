const express = require('express');
const router = express.Router();
const compteController = require("../controllers/compte");

//Ajouter un compte 
router.post("/ajoutercompte", compteController.createCompte);
//Tous les comptes
router.get("/getAllComptes", compteController.getAllComptes);
//Un seul compte
router.get("/uncompte/:id", compteController.getCompteByID);
//Modifier un compte 
router.put("/editercompte/:id", compteController.updateCompte);
//Supprimer un compte 
router.delete("/deletecompte/:id", compteController.deleteCompte);


module.exports= router;