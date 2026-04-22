const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produit');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

//Creer un produit 
router.post("/ajouterproduit", authentification, checkrole(['Admin','Manager']), produitController.createProduit);
//Lister le sproduits
router.get("/getAllProduits", authentification, checkrole(['Admin','Manager', 'Client']),  produitController.getAllProduits);
//Avoir un seul produit
router.get("/unproduit/:id", authentification, checkrole(['Admin','Manager', 'Client']), produitController.getProduitByID);
//Modifier un produit 
router.put("/modifierproduit/:id", authentification, checkrole(['Admin','Manager']), produitController.updateProduit);
//Supprimer un produit
router.delete("/supprimerproduit/:id", authentification, checkrole(['Admin','Manager']), produitController.deleteProduit);

module.exports = router;