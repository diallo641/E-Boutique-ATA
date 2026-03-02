const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager');
//Creer un manager 
router.post('/ajoutermanager', managerController.createManager);
//La liste des managers
router.get('/getAllManagers', managerController.getAllManagers);
//Un manager 
router.get('/getManagerByID/:id', managerController.getManagerByID);
//Modifier un manager
router.put('/updateManager/:id', managerController.updatemanager);
//Supprimer un manager
router.delete('/deleteManager/:id', managerController.deleteManager);
//Les employes du manager
router.get('/getEmployesByManager/:id', managerController.getEmployesByManager);

module.exports=router;