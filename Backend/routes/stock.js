const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

// 🔹 Créer un stock
router.post('/ajouterstock', authentification, checkrole(['Admin','Manager']), stockController.createStock);

// 🔹 Lister tous les stocks
router.get('/getAllStocks', authentification, checkrole(['Admin','Manager']), stockController.getAllStocks);

// 🔹 Stock d'un produit
router.get('/stockproduit/:ID_produit', authentification, checkrole(['Admin','Manager']), stockController.getStockByProductID);

// 🔹 Stock d'une boutique
router.get('/stockboutique/:ID_boutique', authentification, checkrole(['Admin','Manager']), stockController.getStockByBoutique);

// 🔹 Stock d'un produit dans une boutique (clé composite)
router.get('/stockproduitboutique/:ID_produit/:ID_boutique', authentification, checkrole(['Admin','Manager']), stockController.getStockByProductAndBoutique);

// 🔹 Modifier un stock
router.put('/modifierstock/:ID_produit/:ID_boutique', authentification, checkrole(['Admin','Manager']), stockController.updateStock);

// 🔹 Supprimer un stock
router.delete('/deletestock/:ID_produit/:ID_boutique', authentification, checkrole(['Admin','Manager']), stockController.deleteStock);

module.exports = router;