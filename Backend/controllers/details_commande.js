const detailsModel = require("../models/details_commande");
const stockModel = require("../models/stock");
const commandeModel = require("../models/commande");


// ===============================
// AJOUT DETAIL
// ===============================
const ajouter_detail = async (req, res) => {
    try {
        const { ID_commande, ID_produit, Prix, Quantite } = req.body;

        if (!ID_commande || !ID_produit || !Prix || !Quantite) {
            return res.status(400).json({ message: "Champs manquants" });
        }

        const commande = await commandeModel.getCommandeByID(ID_commande);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable" });
        }

        if (commande.Statut_commande === "VALIDÉE") {
            return res.status(403).json({ message: "Commande verrouillée" });
        }

        const ID_boutique = commande.ID_boutique;

        const stock = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);

        if (!stock) {
            return res.status(404).json({ message: "Stock introuvable" });
        }

        const exist = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (exist) {

            const newQty = exist.Quantite + Quantite;

            if (stock.Quantite < Quantite) {
                return res.status(400).json({ message: "Stock insuffisant" });
            }

            await stockModel.decrement_stock(ID_produit, ID_boutique, Quantite);

            await detailsModel.updateDetail({
                ID_commande,
                ID_produit,
                Prix,
                Quantite: newQty
            });

        } else {

            if (stock.Quantite < Quantite) {
                return res.status(400).json({ message: "Stock insuffisant" });
            }

            await stockModel.decrement_stock(ID_produit, ID_boutique, Quantite);

            await detailsModel.ajouterDetail({
                ID_commande,
                ID_produit,
                Prix,
                Quantite
            });
        }

        const total = await detailsModel.calculerTotalCommande(ID_commande);

        await commandeModel.updateCommande({
            id: ID_commande,
            Total: total
        });

        return res.status(201).json({
            message: "Produit ajouté",
            total
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ===============================
// UPDATE DETAIL
// ===============================
const update_detail = async (req, res) => {
    try {
        const { ID_commande, ID_produit, Prix, Quantite } = req.body;

        if (!ID_commande || !ID_produit || !Prix || Quantite == null) {
            return res.status(400).json({ message: "Champs manquants" });
        }

        const commande = await commandeModel.getCommandeByID(ID_commande);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable" });
        }

        if (commande.Statut_commande === "VALIDÉE") {
            return res.status(403).json({ message: "Commande verrouillée" });
        }

        const ID_boutique = commande.ID_boutique;

        const old = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (!old) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        const stock = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);

        const diff = Quantite - old.Quantite;

        if (diff > 0 && stock.Quantite < diff) {
            return res.status(400).json({ message: "Stock insuffisant" });
        }

        if (diff > 0) {
            await stockModel.decrement_stock(ID_produit, ID_boutique, diff);
        }

        if (diff < 0) {
            await stockModel.increment_stock(ID_produit, ID_boutique, Math.abs(diff));
        }

        const detail = await detailsModel.updateDetail({
            ID_commande,
            ID_produit,
            Prix,
            Quantite
        });

        const total = await detailsModel.calculerTotalCommande(ID_commande);

        await commandeModel.updateCommande({
            id: ID_commande,
            Total: total
        });

        return res.status(200).json({
            message: "Mis à jour OK",
            detail,
            total
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ===============================
// DELETE DETAIL
// ===============================
const supprimer_detail = async (req, res) => {
    try {
        const ID_commande = parseInt(req.params.ID_commande);
        const ID_produit = parseInt(req.params.ID_produit);

        if (isNaN(ID_commande) || isNaN(ID_produit)) {
            return res.status(400).json({ message: "Paramètres invalides" });
        }

        const commande = await commandeModel.getCommandeByID(ID_commande);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable" });
        }

        if (commande.Statut_commande === "VALIDÉE") {
            return res.status(403).json({ message: "Commande verrouillée" });
        }

        const ID_boutique = commande.ID_boutique;

        const old = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (!old) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        await stockModel.increment_stock(
            ID_produit,
            ID_boutique,
            old.Quantite
        );

        await detailsModel.supprimerDetail(ID_commande, ID_produit);

        const total = await detailsModel.calculerTotalCommande(ID_commande);

        const updateData = {
            id: ID_commande,
            Total: total
        };

        if (total === 0) {
            updateData.Statut_commande = "Annulée";
        }

        await commandeModel.updateCommande(updateData);

        return res.status(200).json({
            message: "Supprimé",
            total
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ===============================
// GET DETAILS
// ===============================
const get_details_by_commande = async (req, res) => {
    try {
        const ID_commande = parseInt(req.params.ID_commande);

        if (isNaN(ID_commande)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const details = await detailsModel.getDetailsByCommande(ID_commande);

        return res.status(200).json({
            message: "OK",
            details
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    ajouter_detail,
    update_detail,
    supprimer_detail,
    get_details_by_commande
};