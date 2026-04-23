const produitModel = require('../models/produit');
const categorieModel = require('../models/categorie');

//Creer un produit 
const createProduit = async(req, res) =>
{
    try
    {
        const {Nom_produit, Prix, ID_categorie} = req.body;
        if(!Nom_produit || !Prix || !ID_categorie)
        {
            return res.status(400).json({message: "Tous les champs sont requis"});
        }
        else
        {
            const categorieexistant = await categorieModel.getCategorieByID(ID_categorie);
            if(!categorieexistant)
            {
                return res.status(404).json({message: "Categorie non trouvée"});
            }
            else
            {
                const produitexistant = await produitModel.getProduitByName(Nom_produit);
                if(produitexistant)
                {
                    return res.status(409).json({message: "Produit déjà existant"});
                }
                else
                {
                    const nouveauproduit = await produitModel.createProduit(Nom_produit, Prix, ID_categorie);
                    return res.status(201).json({message: "Produit créé avec succès", Produit: nouveauproduit});
                }
            }
        }
    }
    catch(error)
    {
            return res.status(500).json({ message: error.message });
    }
};

//Lister les produits
const getAllProduits = async(req, res) =>
{
    try{
        const produits = await produitModel.getAllProduits();
        if(produits.length==0)
        {
            return res.status(200).json({message: "Aucun produit trouvé", total: 0, Produits: []});
        }
        else
        {
            return res.status(200).json({message: "Produits récupérés avec succès", 
                                        total: produits.length, Produits: produits});
        }

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }   
};

//Avoir un seul produit
const getProduitByID = async(req, res) =>
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
            const produit = await produitModel.getProduitByID(id);
            if(!produit)
            {
                return res.status(404).json({message: "Produit non trouvé"});
            }
            else
            {
                return res.status(200).json({message: "Produit récupéré avec succès", Produit: produit});
            }
        }

    }
    catch(error)   
     {
        return res.status(500).json({ message: error.message });
    }
};

//Editer un produit
const updateProduit = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        const {Nom_produit, Prix, ID_categorie} = req.body;
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            //Verifier l'existance du produit 
            const produitexistant = await produitModel.getProduitByID(id);
            if(!produitexistant)
            {
                return res.status(404).json({message: "Produit non trouvé"});
            }
            else
            {
                if(!Nom_produit || !Prix || !ID_categorie)
                {
                    return res.status(400).json({message: "Tous les champs sont requis"});
                }
                else
                {
                    
                    const categorieexistant = await categorieModel.getCategorieByID(ID_categorie);
                    if(!categorieexistant)
                    {
                        return res.status(404).json({message: "Categorie non trouvée"});
                    }
                    else
                    {
                        const nomproduit = await produitModel.getProduitByName(Nom_produit);
                        if(nomproduit && nomproduit.ID_produit !== id)
                        {
                            return res.status(409).json({message: "Nom de produit déjà existant"});
                        }
                        else
                        {
                            const produitmodifier = await produitModel.updateProduit(id, Nom_produit, Prix, ID_categorie);
                            return res.status(200).json({message: "Produit modifié avec succès", Produit: produitmodifier});
                        }
                    }
                }
            }
        }

    }
    catch(error)    
    {
        return res.status(500).json({ message: error.message });
    }
}

//Supprimer un produit
const deleteProduit = async(req, res) =>
{
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            const produitexistant = await produitModel.getProduitByID(id);
            if(!produitexistant)
            {
                return res.status(404).json({message: "Produit non trouvé"});
            }
            else
            {
                const produitsupprimer = await produitModel.deleteProduit(id);
                return res.status(200).json({message: "Produit supprimé avec succès", produitsupprimer});
            }
        }

    }
    catch(error)
    {
        return res.status(500).json({message: error.message});
        
    }    
}

module.exports = {
    createProduit,
    getAllProduits,
    getProduitByID,
    updateProduit,
    deleteProduit
}
