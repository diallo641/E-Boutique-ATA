const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employe');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

// Créer un employé 
router.post('/ajouteremploye', authentification, checkrole(['Admin','Manager']), employeController.createEmploye);
// Lister tous les employés
router.get('/getAllEmployes', authentification, checkrole(['Admin','Manager']), employeController.getAllEmployes);
// Lister les employés d'une boutique
router.get('/getEmployesByBoutique/:id', authentification, checkrole(['Admin','Manager']), employeController.getEmployesByBoutique);
// Lister les employés dirigés par un manager
router.get('/getEmployesByManager/:id', authentification, checkrole(['Admin','Manager']), employeController.getEmployesByManager);
// Récupérer un employé par son ID
router.get('/getEmployeByID/:id', authentification, checkrole(['Admin','Manager']), employeController.getEmployeByID);
// Modifier un employé
router.put('/updateEmploye/:id', authentification, checkrole(['Admin','Manager']), employeController.updateEmploye);
// Supprimer un employé
router.delete('/deleteEmploye/:id', authentification, checkrole(['Admin','Manager']), employeController.deleteEmploye);

module.exports = router;