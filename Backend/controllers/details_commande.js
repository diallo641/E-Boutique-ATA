const detailsModel = require("../models/details_commande");
const stockModel = require("../models/stock");
const commandeModel = require("../models/commande");


// ===============================
// AJOUTER UN PRODUIT
// ===============================
const ajouter_detail = async (req, res) => {
    try {
        const { ID_commande, ID_produit, Prix, Quantite } = req.body;

        if (!ID_commande || !ID_produit || !Prix || !Quantite) {
            return res.status(400).json({ message: "tous les champs sont requis" });
        }

        const commande = await commandeModel.getCommandeByID(ID_commande);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable" });
        }

        // 🔒 VERROUILLAGE
        if (commande.Statut_commande === "VALIDÉE") {
            return res.status(403).json({ message: "Commande verrouillée" });
        }

        const ID_boutique = commande.ID_boutique;

        const stock = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);

        if (!stock) {
            return res.status(404).json({ message: "Stock introuvable" });
        }

        const detail_existant = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (detail_existant) {

            const nouvelleQuantite = detail_existant.Quantite + Quantite;

            if (stock.Quantite < Quantite) {
                return res.status(400).json({ message: "Stock insuffisant" });
            }

            await stockModel.decrement_stock(ID_produit, ID_boutique, Quantite);

            await detailsModel.updateDetail({
                ID_commande,
                ID_produit,
                Prix,
                Quantite: nouvelleQuantite
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
            message: "Produit ajouté à la commande",
            total
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ===============================
// MODIFIER UN PRODUIT
// ===============================
const update_detail = async (req, res) => {
    try {
        const { ID_commande, ID_produit, Prix, Quantite } = req.body;

        if (!ID_commande || !ID_produit || !Prix || Quantite == null) {
            return res.status(400).json({ message: "tous les champs sont requis" });
        }

        const commande = await commandeModel.getCommandeByID(ID_commande);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable" });
        }

        // 🔒 VERROUILLAGE
        if (commande.Statut_commande === "VALIDÉE") {
            return res.status(403).json({ message: "Commande verrouillée" });
        }

        const ID_boutique = commande.ID_boutique;

        const ancien_detail = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (!ancien_detail) {
            return res.status(404).json({ message: "produit non trouvé dans la commande" });
        }

        const stock = await stockModel.getStockByProductAndBoutique(ID_produit, ID_boutique);

        if (!stock) {
            return res.status(404).json({ message: "Stock introuvable" });
        }

        const diff = Quantite - ancien_detail.Quantite;

        if (diff > 0) {
            if (stock.Quantite < diff) {
                return res.status(400).json({ message: "Stock insuffisant" });
            }
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
            message: "detail mis à jour",
            detail,
            total
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ===============================
// SUPPRIMER UN PRODUIT
// ===============================
const supprimer_detail = async (req, res) => {
    try {
        const ID_commande = parseInt(req.params.id_commande);
        const ID_produit = parseInt(req.params.id_produit);

        if (isNaN(ID_commande) || isNaN(ID_produit)) {
            return res.status(400).json({ message: "parametres invalides" });
        }

        const commande = await commandeModel.getCommandeByID(ID_commande);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable" });
        }

        // 🔒 VERROUILLAGE
        if (commande.Statut_commande === "VALIDÉE") {
            return res.status(403).json({ message: "Commande verrouillée" });
        }

        const ID_boutique = commande.ID_boutique;

        const ancien_detail = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (!ancien_detail) {
            return res.status(404).json({ message: "produit non trouvé dans la commande" });
        }

        await stockModel.increment_stock(
            ID_produit,
            ID_boutique,
            ancien_detail.Quantite
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
            message: "produit supprimé de la commande",
            total
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ===============================
// LISTE DETAILS COMMANDE
// ===============================
const get_details_by_commande = async (req, res) => {
    try {
        const ID_commande = parseInt(req.params.id);

        if (isNaN(ID_commande) || ID_commande <= 0) {
            return res.status(400).json({ message: "id commande invalide" });
        }

        const details = await detailsModel.getDetailsByCommande(ID_commande);

        return res.status(200).json({
            message: "liste des details de la commande",
            details
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ===============================
module.exports = {
    ajouter_detail,
    update_detail,
    supprimer_detail,
    get_details_by_commande
};