const express = require('express');
const router = express.Router();
const categorieController = require("../controllers/categorie");

//Creer uen categorie
router.post("/ajoutercategorie" , categorieController.createCategorie);
//Recuper toutes le scategories
router.get("/getAllCategories", categorieController.getAllCategories);
//Recuperer une categorie
router.get("/getCategorieByID/:id", categorieController.getCategorieByID);
//Editer une categorie
router.put("/updateCategorie/:id", categorieController.updateCategorie);
//Supprimer une categorie
router.delete("/deleteCategorie/:id", categorieController.deleteCategorie);

module.exports = router;