const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');

//Ajouter un client
router.post("/ajouterclient", clientController.createClient);
//Lister les clients
router.get('/getAllClients', clientController.getAllClients);
//Un client
router.get("/unclient/:id", clientController.getClientByID);
//Editer un client
router.put('/editerclient/:id', clientController.updateClient);
//Supprimer un client
router.delete('/supprimerclient', clientController.deleteClient);

module.exports=router;
