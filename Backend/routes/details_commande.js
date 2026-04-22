const express = require('express');
const router = express.Router();
const detailController = require('../controllers/details_commande');
console.log("DETAIL ROUTER LOADED");

// ajouter un detail
router.post('/ajouterdetail', detailController.ajouter_detail);

// avoir les details d'une commande
router.get('/detailcommande/:ID_commande', detailController.get_details_by_commande);

// modifier un detail
router.put('/update', detailController.update_detail); // les infos passent dans body

// supprimer un detail
router.delete('/delete/:ID_commande/:ID_produit/:ID_boutique', detailController.supprimer_detail);

module.exports = router;