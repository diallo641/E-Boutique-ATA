const express = require('express');
const router = express.Router();
const BoutiqueController = require('../controllers/boutique');

//Ajouter une boutique
router.post("/ajouterboutique", BoutiqueController.ajouterBoutique);
//Toutes les boutiques
router.get("/getAllBoutiques", BoutiqueController.getAllBoutiques);
//Une seule boutique
router.get("/uneboutique/:id", BoutiqueController.getBoutiqueById);
//editer une boutique
router.put("/editerboutique/:id", BoutiqueController.updateBoutique);
//Supprimer une boutique
router.delete("/supprimerboutique/:id", BoutiqueController.deleteBoutique);

module.exports=router;