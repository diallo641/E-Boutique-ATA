const categorieModel = require("../models/categorie");
const produitModel = require("../models/produit");

//Creer une categorie
const createCategorie = async(req, res) =>
{
    try{
        const {Nom_categorie, Description} = req.body;
        if(!Nom_categorie || !Description)
        {
            return res.status(400).json({message: "Tous les champs sont requis"});
        }
        else
        {
            //Verifier l'existance du nom de categorie
            const categorieexistant = await categorieModel.getCategorieByName(Nom_categorie);
            if(categorieexistant)
            {
                return res.status(409).json({message: "Le nom de catégorie existe déjà"});
            }
            else
            {
                const nouvellecategorie = await categorieModel.createCategorie(Nom_categorie, Description);
                return res.status(200).json({message: "Catégorie créée avec succès", Categorie: nouvellecategorie});
            }
        }

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }

};

//Recuperer tous les categories
const getAllCategories = async(req, res) =>
{
    try
    {
        const categorie = await categorieModel.getAllCategories();
        if(categorie.length === 0)
        {
            return res.status(404).json({message: "Aucune catégorie trouvée"});
        }
        else
        {
            return res.status(200).json({categories: categorie, total: categorie.length});
        }

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });

    }
   
};

//Recuperer une categorie par ID
const getCategorieByID = async(req, res) =>
{
    try{
        const id= parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            const categorieexistant = await categorieModel.getCategorieByID(id);
            if(!categorieexistant)
            {
                return res.status(404).json({message: "Catégorie non trouvée"});
            }
            else
            {
                return res.status(200).json({message: "Catégorie trouvée", categorie: categorieexistant});
            }

        }      

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};
//Modifier une categorie
const updateCategorie = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            const categorieexistant = await categorieModel.getCategorieByID(id);
            if(!categorieexistant)
            {
                return res.status(404).json({message: "Catégorie non trouvée"});
            }
            else
            {
                const Nom_categorie = req.body.Nom_categorie || categorieexistant.Nom_categorie;
                const Description = req.body.Description || categorieexistant.Description;
                //Verifier le nom
                const categorieexistantnom = await categorieModel.getCategorieByName(Nom_categorie);
                if(categorieexistantnom && categorieexistantnom.ID_categorie !== id)
                {
                    return res.status(409).json({message: "Le nom de catégorie existe déjà"});
                }
                else
                {
                    const categorieupdate = await categorieModel.updateCategorie(id, Nom_categorie, Description);
                    return res.status(200).json({message: "Catégorie modifiée avec succès", categorie: categorieupdate});
                }
        }

    }
   
} catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Supprimer une categorie
const deleteCategorie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const categorieexistant = await categorieModel.getCategorieByID(id);

    if (!categorieexistant) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    // 🔥 VERIFICATION PRODUITS LIÉS
    const produits = await produitModel.getProduitsByCategorie(id);

    if (produits.length > 0) {
      return res.status(400).json({
        message: "Impossible de supprimer : cette catégorie contient des produits"
      });
    }

    // ✅ suppression autorisée
    await categorieModel.deleteCategorie(id);

    return res.status(200).json({
      message: "Catégorie supprimée avec succès"
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Exporter les fonctions
module.exports = 
{
    createCategorie,
    getAllCategories,
    getCategorieByID,
    updateCategorie,
    deleteCategorie
}