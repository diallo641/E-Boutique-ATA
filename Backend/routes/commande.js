const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commande');

//Creer une commande
router.post('/ajoutercommande', commandeController.createCommande);
//Avoir toute les commandes
router.get('/getAllCommandes', commandeController.getAllCommandes);
//Avoir une seule commande
router.get('/getCommandeByID/:id', commandeController.getCommandeByID);
//Commande d'une boutique
router.get('/getCommandeByBoutique/:id', commandeController.getCommandeByBoutique);
//Les commandes d'un employe
router.get('/getCommandeByEmploye/:id', commandeController.getCommandeByEmploye);
//Les commnandes d'un client
router.get('/getCommandesClient/:id', commandeController.getCommandesClient);
//Editer une commande
router.put('/updateCommande/:id', commandeController.updateCommande);
//supprimer une commande
router.delete('/deleteCommande/:id', commandeController.deleteCommande);

module.exports = router;