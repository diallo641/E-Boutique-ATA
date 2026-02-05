const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role');

//ajouter un role
router.post('/ajouterrole', roleController.createRole);
//avoir tous les rôles
router.get('/getallroles', roleController.getAllRoles);
//avoir un rôle par son id
router.get('/unrole/:id', roleController.getRoleById);
//editer un rôle
router.put('/editerrole/:id', roleController.updateRole);
//supprimer un rôle
router.delete('/deleterole/:id', roleController.deleteRole);

module.exports = router;

