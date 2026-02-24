const stockModel = require('../models/stock');

// Créer un stock de produit
const createStock = async (req, res) => {
    try {
        const { ID_produit, ID_boutique, Quantite } = req.body;

        if (!ID_produit || !ID_boutique || !Quantite) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        // Vérifier si le stock existe déjà
        const stockExistant = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);
        if (stockExistant) {
            return res.status(409).json({ message: "Stock déjà existant pour ce produit et cette boutique", Stock: stockExistant });
        }

        // Créer le stock
        const nouveauStock = await stockModel.createStock(ID_boutique, ID_produit, Quantite);
        return res.status(201).json({ message: "Stock créé avec succès", Stock: nouveauStock });

    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la création du stock", error: error.message });
    }
};

// Lister tous les stocks
const getAllStocks = async (req, res) => {
    try {
        const stocks = await stockModel.getAllStocks();
        return res.status(200).json({
            message: stocks.length === 0 ? "Aucun stock trouvé" : "Stocks récupérés avec succès",
            total: stocks.length,
            Stocks: stocks
        });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des stocks", error: error.message });
    }
};

// Récupérer le stock d'un produit
const getStockByProductID = async (req, res) => {
    try {
        const { ID_produit } = req.params;
        const stocks = await stockModel.getStockByProductID(ID_produit);
        return res.status(200).json({
            message: stocks.length === 0 ? "Aucun stock trouvé pour ce produit" : "Stocks récupérés avec succès",
            total: stocks.length,
            Stocks: stocks
        });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération du stock", error: error.message });
    }
};

// Récupérer le stock d'une boutique
const getStockByBoutique = async (req, res) => {
    try {
        const { ID_boutique } = req.params;
        const stocks = await stockModel.getStockByBoutique(ID_boutique);
        return res.status(200).json({
            message: stocks.length === 0 ? "Aucun stock trouvé pour cette boutique" : "Stocks récupérés avec succès",
            total: stocks.length,
            Stocks: stocks
        });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération du stock", error: error.message });
    }
};

// Récupérer un stock par produit et boutique (clé composite)
const getStockByProductAndBoutique = async (req, res) => {
    try {
        const { ID_produit, ID_boutique } = req.params;

        const stock = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);
        if (!stock) {
            return res.status(404).json({ message: "Stock non trouvé pour ce produit et cette boutique" });
        }

        return res.status(200).json({ message: "Stock récupéré avec succès", Stock: stock });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération du stock", error: error.message });
    }
};

// Modifier un stock
const updateStock = async (req, res) => {
    try {
        const { ID_produit, ID_boutique } = req.params;
        const { Quantite } = req.body;

        if (!Quantite) {
            return res.status(400).json({ message: "La quantité est requise" });
        }

        const stockExistant = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);
        if (!stockExistant) {
            return res.status(404).json({ message: "Stock non trouvé pour ce produit et cette boutique" });
        }

        const stockMisAJour = await stockModel.updateStock(ID_boutique, ID_produit, Quantite);
        return res.status(200).json({ message: "Stock mis à jour avec succès", Stock: stockMisAJour });

    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la mise à jour du stock", error: error.message });
    }
};

// Supprimer un stock
const deleteStock = async (req, res) => {
    try {
        const { ID_produit, ID_boutique } = req.params;

        const stockExistant = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);
        if (!stockExistant) {
            return res.status(404).json({ message: "Stock non trouvé pour ce produit et cette boutique" });
        }

        await stockModel.deleteStock(ID_boutique, ID_produit);
        return res.status(200).json({ message: "Stock supprimé avec succès" });

    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression du stock", error: error.message });
    }
};

module.exports = {
    createStock,
    getAllStocks,
    getStockByProductID,
    getStockByBoutique,
    getStockByProductAndBoutique,
    updateStock,
    deleteStock
};