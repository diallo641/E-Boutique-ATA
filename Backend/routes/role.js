const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

//ajouter un role
router.post('/ajouterrole', authentification, checkrole(['Admin']), roleController.createRole);
//avoir tous les rôles
router.get('/getallroles', authentification, checkrole(['Admin','Manager']) ,roleController.getAllRoles);
//avoir un rôle par son id
router.get('/unrole/:id',  authentification, checkrole(['Admin','Manager']) ,roleController.getRoleById);
//editer un rôle
router.put('/editerrole/:id', authentification, checkrole(['Admin']) , roleController.updateRole);
//supprimer un rôle
router.delete('/deleterole/:id',  authentification, checkrole(['Admin']), roleController.deleteRole);

module.exports = router;

