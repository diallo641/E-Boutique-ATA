const stockModel = require('../models/stock');
const managerModel = require('../models/manager');
const { get } = require('mongoose');


// -------------------
// Créer un stock
// -------------------
const createStock = async (req, res) => {
    try {
        const { ID_produit, ID_boutique, Quantite } = req.body;

        if (!ID_produit || !ID_boutique || Quantite === undefined) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        if (Quantite < 0) {
            return res.status(400).json({ message: "Quantité invalide" });
        }

        // 🔒 Manager
        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique !== ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        // 🔒 Employé
        if (req.user.Nom_role === "Employe" && req.user.ID_boutique !== ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const stockExistant = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);

        if (stockExistant) {
            return res.status(409).json({
                message: "Stock déjà existant",
                Stock: stockExistant
            });
        }

        const nouveauStock = await stockModel.createStock(ID_boutique, ID_produit, Quantite);

        return res.status(201).json({
            message: "Stock créé avec succès",
            Stock: nouveauStock
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// Lister tous les stocks
// -------------------
const getAllStocks = async (req, res) => {
    try {
        let stocks;

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager) {
                return res.status(404).json({ message: "Manager introuvable" });
            }

            stocks = await stockModel.getStockByBoutique(manager.ID_boutique);
        }

        else if (req.user.Nom_role === "Employe") {
            stocks = await stockModel.getStockByBoutique(req.user.ID_boutique);
        }

        else {
            stocks = await stockModel.getAllStocks();
        }

        return res.status(200).json({
            message: stocks.length === 0 ? "Aucun stock trouvé" : "Stocks récupérés",
            total: stocks.length,
            Stocks: stocks
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// STOCK TOTAL PAR PRODUIT
const getStockByProductID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID produit invalide" });
        }

        const stock = await stockModel.getStockByProductID(id);

        return res.status(200).json({
            message: "Stock récupéré avec succès",
            Stock: stock
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Stock total par produit
const getStockByProduitSimple = async (req, res) => {
    try {
        const ID_produit = parseInt(req.params.ID_produit);

        if (isNaN(ID_produit)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const stock = await stockModel.getStockByProductID(ID_produit);

        return res.status(200).json({
            message: "Stock récupéré",
            Stock: stock || { Quantite: 0 }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// Stock par boutique
// -------------------
const getStockByBoutique = async (req, res) => {
    try {
        const { ID_boutique } = req.params;

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique != ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        if (req.user.Nom_role === "Employe" && req.user.ID_boutique != ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const stocks = await stockModel.getStockByBoutique(ID_boutique);

        return res.status(200).json({
            message: stocks.length === 0 ? "Aucun stock trouvé" : "Stocks récupérés",
            total: stocks.length,
            Stocks: stocks
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// Stock produit + boutique
// -------------------
const getStockByProductAndBoutique = async (req, res) => {
    try {
        const { ID_produit, ID_boutique } = req.params;

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique != ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        if (req.user.Nom_role === "Employe" && req.user.ID_boutique != ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const stock = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);

        if (!stock) {
            return res.status(404).json({ message: "Stock non trouvé" });
        }

        return res.status(200).json({
            message: "Stock récupéré",
            Stock: stock
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// Modifier stock
// -------------------
const updateStock = async (req, res) => {
    try {
        const { ID_produit, ID_boutique } = req.params;
        const { Quantite } = req.body;

        if (Quantite === undefined || Quantite < 0) {
            return res.status(400).json({ message: "Quantité invalide" });
        }

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique != ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        if (req.user.Nom_role === "Employe" && req.user.ID_boutique != ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const stockExistant = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);

        if (!stockExistant) {
            return res.status(404).json({ message: "Stock non trouvé" });
        }

        const stockMisAJour = await stockModel.updateStock(
            ID_boutique,
            ID_produit,
            Quantite
        );

        return res.status(200).json({
            message: "Stock mis à jour",
            Stock: stockMisAJour
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// Supprimer stock
// -------------------
const deleteStock = async (req, res) => {
    try {
        const { ID_produit, ID_boutique } = req.params;

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique != ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        if (req.user.Nom_role === "Employe" && req.user.ID_boutique != ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const stockExistant = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);

        if (!stockExistant) {
            return res.status(404).json({ message: "Stock non trouvé" });
        }

        await stockModel.deleteStock(ID_boutique, ID_produit);

        return res.status(200).json({
            message: "Stock supprimé avec succès"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
module.exports = {
    createStock,
    getAllStocks,
    getStockByProductID,
    getStockByBoutique,
    getStockByProductAndBoutique,
    updateStock,
    deleteStock,
    getStockByProduitSimple
};