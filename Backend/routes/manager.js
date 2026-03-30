const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

//Creer un manager 
router.post('/ajoutermanager', authentification, checkrole(['Admin']), managerController.createManager);
//La liste des managers
router.get('/getAllManagers', authentification, checkrole(['Admin']), managerController.getAllManagers);
//Un manager 
router.get('/getManagerByID/:id', authentification, checkrole(['Admin']), managerController.getManagerByID);
//Modifier un manager
router.put('/updateManager/:id', authentification, checkrole(['Admin']),  authentification, checkrole(['Admin']), managerController.updatemanager);
//Supprimer un manager
router.delete('/deleteManager/:id', authentification, checkrole(['Admin']), managerController.deleteManager);
//Les employes du manager
router.get('/getEmployesByManager/:id', authentification, checkrole(['Admin']), managerController.getEmployesByManager);

module.exports=router;