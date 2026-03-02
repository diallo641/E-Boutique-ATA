const detailsModel = require("../models/details_commande");
const stockModel = require("../models/stock");
const commandeModel = require("../models/commande");

// ajouter un produit à une commande
const ajouter_detail = async (req, res) => {
    try {
        const { ID_commande, ID_produit, Prix, Quantite, ID_boutique } = req.body;

        if (!ID_commande || !ID_produit || !Prix || !Quantite || !ID_boutique) {
            return res.status(400).json({ message: "tous les champs sont requis" });
        }

        // Vérifier si le produit existe déjà dans la commande
        const detail_existant = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (detail_existant) {
            // Si existant, on ajoute la quantité
            const nouvelleQuantite = detail_existant.Quantite + Quantite;

            // Ajuster le stock
            await stockModel.decrement_stock(ID_produit, ID_boutique, Quantite);

            // Mettre à jour le détail
            await detailsModel.updateDetail({
                ID_commande,
                ID_produit,
                Prix,
                Quantite: nouvelleQuantite
            });

        } else {
            // Sinon, créer un nouveau détail
            // Décrémenter le stock
            await stockModel.decrement_stock(ID_produit, ID_boutique, Quantite);

            await detailsModel.ajouterDetail({
                ID_commande,
                ID_produit,
                Prix,
                Quantite
            });
        }

        // Recalculer le total
        const total = await detailsModel.calculerTotalCommande(ID_commande);

        // Mettre à jour la commande
        await commandeModel.updateCommande(ID_commande, { Total: total });

        return res.status(201).json({ message: "produit ajouté à la commande", total });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// modifier un produit dans une commande
const update_detail = async (req, res) => {
    try {
        const { ID_commande, ID_produit, Prix, Quantite, ID_boutique } = req.body;

        if (!ID_commande || !ID_produit || !Prix || !Quantite || !ID_boutique) {
            return res.status(400).json({ message: "tous les champs sont requis" });
        }

        // récupérer l'ancien détail
        const ancien_detail = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (!ancien_detail) {
            return res.status(404).json({ message: "produit non trouvé dans la commande" });
        }

        // ajuster le stock
        if (Quantite > ancien_detail.Quantite) {
            await stockModel.decrement_stock(
                ID_produit,
                ID_boutique,
                Quantite - ancien_detail.Quantite
            );
        } else if (Quantite < ancien_detail.Quantite) {
            await stockModel.increment_stock(
                ID_produit,
                ID_boutique,
                ancien_detail.Quantite - Quantite
            );
        }

        // mise à jour du détail
        const detail = await detailsModel.updateDetail({
            ID_commande,
            ID_produit,
            Prix,
            Quantite
        });

        // recalcul du total
        const total = await detailsModel.calculerTotalCommande(ID_commande);
        await commandeModel.updateCommande(ID_commande, { Total: total });

        return res.status(200).json({
            message: "detail mis à jour",
            detail,
            total
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// supprimer un produit d'une commande
const supprimer_detail = async (req, res) => {
    try {
        const ID_commande = parseInt(req.params.id_commande);
        const ID_produit = parseInt(req.params.id_produit);
        const ID_boutique = parseInt(req.params.id_boutique);

        if (isNaN(ID_commande) || isNaN(ID_produit) || isNaN(ID_boutique)) {
            return res.status(400).json({ message: "parametres invalides" });
        }

        // récupérer l'ancien détail
        const ancien_detail = await detailsModel.detailcommande(ID_commande, ID_produit);

        if (!ancien_detail) {
            return res.status(404).json({ message: "produit non trouvé dans la commande" });
        }

        // remettre le stock
        await stockModel.increment_stock(
            ID_produit,
            ID_boutique,
            ancien_detail.Quantite
        );

        // supprimer le détail
        await detailsModel.supprimerDetail(ID_commande, ID_produit);

        // recalcul du total
        const total = await detailsModel.calculerTotalCommande(ID_commande);

        // si la commande devient vide
        if (total === 0) {
            await commandeModel.updateCommande(ID_commande, {
                Total: 0,
                Statut_commande: "Annulée"
            });
        } else {
            await commandeModel.updateCommande(ID_commande, { Total: total });
        }

        return res.status(200).json({
            message: "produit supprimé de la commande",
            ID_commande,
            ID_produit,
            total
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// lister les détails d'une commande
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


module.exports = {
    ajouter_detail,
    update_detail,
    supprimer_detail,
    get_details_by_commande
};