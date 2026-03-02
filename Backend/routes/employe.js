const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employe');

// Créer un employé 
router.post('/ajouteremploye', employeController.createEmploye);
// Lister tous les employés
router.get('/getAllEmployes', employeController.getAllEmployes);
// Lister les employés d'une boutique
router.get('/getEmployesByBoutique/:id', employeController.getEmployesByBoutique);
// Lister les employés dirigés par un manager
router.get('/getEmployesByManager/:id', employeController.getEmployesByManager);
// Récupérer un employé par son ID
router.get('/getEmployeByID/:id', employeController.getEmployeByID);
// Modifier un employé
router.put('/updateEmploye/:id', employeController.updateEmploye);
// Supprimer un employé
router.delete('/deleteEmploye/:id', employeController.deleteEmploye);

module.exports = router;