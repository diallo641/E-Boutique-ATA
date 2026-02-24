const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produit');

//Creer un produit 
router.post("/ajouterproduit", produitController.createProduit);
//Lister le sproduits
router.get("/getAllProduits", produitController.getAllProduits);
//Avoir un seul produit
router.get("/unproduit/:id", produitController.getProduitByID);
//Modifier un produit 
router.put("/modifierproduit/:id", produitController.updateProduit);
//Supprimer un produit
router.delete("/supprimerproduit/:id", produitController.deleteProduit);

module.exports = router;