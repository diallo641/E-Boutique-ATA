const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock');

//Creer un stock
router.post('/ajouterstock', stockController.createStock);
//Lister les stocks
router.get("/getAllStocks", stockController.getAllStocks);
//Avoir un seul stock par ID
router.get("/unstock/:ID_produit/:ID_boutique", stockController.getStockByProductID)
//Modifier
router.put("/modifierstock/:ID_produit/:ID_boutique", stockController.updateStock);
//Supprimer stock
router.delete("/deletestock/:ID_produit/:ID_boutique", stockController.deleteStock);
//Stock des produits 
router.get("/stockproduit/:ID_produit", stockController.getStockByProductID);
//Stock des boutiques
router.get("/stockboutique/:ID_boutique", stockController.getStockByBoutique);
//Stock d'un produit dans une boutique
router.get("/stockproduitboutique/:ID_produit/:ID_boutique", stockController.getStockByProductAndBoutique);

module.exports = router;