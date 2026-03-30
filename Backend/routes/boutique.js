const express = require('express');
const router = express.Router();
const BoutiqueController = require('../controllers/boutique');
const authentification = require('../middlewares/authentification');
const checkrole = require('../middlewares/checkrole');

//Ajouter une boutique
router.post("/ajouterboutique", authentification, checkrole(['Admin','Manager']), BoutiqueController.ajouterBoutique);
//Toutes les boutiques
router.get("/getAllBoutiques", authentification, checkrole(['Admin','Manager']), BoutiqueController.getAllBoutiques);
//Une seule boutique
router.get("/uneboutique/:id", authentification, checkrole(['Admin','Manager']), BoutiqueController.getBoutiqueById);
//editer une boutique
router.put("/editerboutique/:id", authentification, checkrole(['Admin','Manager']), BoutiqueController.updateBoutique);
//Supprimer une boutique
router.delete("/supprimerboutique/:id", authentification, checkrole(['Admin','Manager']), BoutiqueController.deleteBoutique);

module.exports=router;