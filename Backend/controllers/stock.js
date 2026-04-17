const stockModel = require('../models/stock');
const managerModel = require('../models/manager');


// Créer un stock
const createStock = async (req, res) => {
    try {
        const { ID_produit, ID_boutique, Quantite } = req.body;

        if (!ID_produit || !ID_boutique || !Quantite) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        // 🔒 Sécurité Manager
        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique !== ID_boutique) {
                return res.status(403).json({ message: "Accès interdit : vous ne pouvez gérer que votre boutique" });
            }
        }

        // 🔒 Sécurité Employé
        if (req.user.Nom_role === "Employe" && req.user.ID_boutique !== ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const stockExistant = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);
        if (stockExistant) {
            return res.status(409).json({ message: "Stock déjà existant", Stock: stockExistant });
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
// Lister les stocks
// -------------------
const getAllStocks = async (req, res) => {
    try {
        let stocks;

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager) return res.status(404).json({ message: "Manager introuvable" });

            stocks = await stockModel.getStockByBoutique(manager.ID_boutique);
        }

        else if (req.user.Nom_role === "Employe") {
            stocks = await stockModel.getStockByBoutique(req.user.ID_boutique);
        }

        else {
            stocks = await stockModel.getAllStocks();
        }

        return res.status(200).json({
            message: stocks.length === 0 ? "Aucun stock trouvé" : "Stocks récupérés avec succès",
            total: stocks.length,
            Stocks: stocks
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// -------------------
// Stock par produit
// -------------------
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
        return res.status(500).json({ message: error.message });
    }
};

// -------------------
// Stock par boutique
// -------------------
const getStockByBoutique = async (req, res) => {
    try {
        const { ID_boutique } = req.params;

        // 🔒 Manager
        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique != ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        // 🔒 Employé
        if (req.user.Nom_role === "Employe" && req.user.ID_boutique != ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const stocks = await stockModel.getStockByBoutique(ID_boutique);

        return res.status(200).json({
            message: stocks.length === 0 ? "Aucun stock trouvé pour cette boutique" : "Stocks récupérés avec succès",
            total: stocks.length,
            Stocks: stocks
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// -------------------
// Stock spécifique (produit + boutique)
// -------------------
const getStockByProductAndBoutique = async (req, res) => {
    try {
        const { ID_produit, ID_boutique } = req.params;

        // 🔒 Manager
        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique != ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        // 🔒 Employé
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

        if (!Quantite) {
            return res.status(400).json({ message: "La quantité est requise" });
        }

        // 🔒 Manager
        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique != ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        // 🔒 Employé
        if (req.user.Nom_role === "Employe" && req.user.ID_boutique != ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const stockExistant = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);
        if (!stockExistant) {
            return res.status(404).json({ message: "Stock non trouvé" });
        }

        const stockMisAJour = await stockModel.updateStock(ID_boutique, ID_produit, Quantite);

        return res.status(200).json({
            message: "Stock mis à jour avec succès",
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

        // 🔒 Manager
        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);

            if (!manager || manager.ID_boutique != ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        // 🔒 Employé
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
    deleteStock
};