const commandeModel = require('../models/commande');
const clientModel = require('../models/client');
const employeModel = require('../models/employe');
const boutiqueModel = require('../models/boutique');
const managerModel = require('../models/manager');
const stockModel = require('../models/stock');

// -------------------
// Créer une commande
// -------------------
const createCommande = async (req, res) => {
    
    try {
        const {
            Total,
            Mode_paiement,
            ID_boutique,
            produits // 👈 AJOUT OBLIGATOIRE
        } = req.body;

        if (!Total || !Mode_paiement || !ID_boutique || !produits) {
            return res.status(400).json({ message: "Champs obligatoires manquants" });
        }

        // =========================
        // 🔐 CLIENT depuis token
        // =========================
        const client = await clientModel.getClientProfile(req.user.ID_compte);

        if (!client) {
            return res.status(404).json({ message: "Client introuvable" });
        }

        const boutique = await boutiqueModel.getBoutiqueByID(ID_boutique);
        if (!boutique) {
            return res.status(404).json({ message: "Boutique inexistante" });
        }

        let ID_employe = null;

        // =========================
        // 👨‍💼 rôle employé
        // =========================
        if (req.user.Nom_role === "Employe") {
            ID_employe = req.user.ID_employe;

            if (req.user.ID_boutique !== ID_boutique) {
                return res.status(403).json({ message: "Accès interdit boutique" });
            }
        }

        // =========================
        // 👤 rôle client
        // =========================
        if (req.user.Nom_role === "Client") {
            ID_employe = null;
        }

        // =========================
        // 🧾 création commande
        // =========================
        const nouvelleCommande = await commandeModel.createCommande({
            Total,
            Statut_commande: "En attente",
            Mode_paiement,
            ID_client: client.ID_client,
            ID_employe,
            ID_boutique
        });

        // =========================
        // 📦 GESTION STOCK + DÉTAILS
        // =========================
        console.log("BODY REÇU:", req.body);
        for (let item of produits) {

            // 1. récupérer stock
            const stock = await stockModel.getStockByProductAndBoutique(
                item.ID_produit,
                ID_boutique
            );

            if (!stock) {
                return res.status(404).json({
                    message: `Stock introuvable produit ${item.ID_produit}`
                });
            }

            // 2. vérifier stock
            if (stock.Quantite < item.Quantite) {
                return res.status(400).json({
                    message: `Stock insuffisant pour produit ${item.ID_produit}`
                });
            }

            // 3. créer détail commande
            await commandeModel.createDetailCommande({
                ID_commande: nouvelleCommande.ID_commande,
                ID_produit: item.ID_produit,
                Prix: item.Prix,
                Quantite: item.Quantite,
                ID_boutique
            });

            // 4. décrémenter stock
            await stockModel.updateStock(
                ID_boutique,
                item.ID_produit,
                stock.Quantite - item.Quantite
            );
        }

        return res.status(201).json({
            message: "Commande créée avec succès",
            Commande: nouvelleCommande
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
// -------------------
// Lister toutes les commandes
// -------------------
const getAllCommandes = async (req, res) => {
    try {
        let commandes;

        if (req.user.Nom_role === "Client") {
            commandes = await commandeModel.getCommandesByClientID(req.user.ID_compte);
        }

        else if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager) return res.status(404).json({ message: "Manager introuvable" });

            commandes = await commandeModel.getCommandesByBoutiqueID(manager.ID_boutique);
        }

        else if (req.user.Nom_role === "Employe") {
            commandes = await commandeModel.getCommandesByBoutiqueID(req.user.ID_boutique);
        }

        else {
            commandes = await commandeModel.getAllCommandes();
        }

        return res.status(200).json({
            message: "Commandes récupérées",
            total: commandes.length,
            commandes
        });

    } catch (error) {
        console.error("Erreur getAllCommandes :", error);
        return res.status(500).json({ message: error.message });
    }
};

// -------------------
// Commande par ID
// -------------------
const getCommandeByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });

        const commande = await commandeModel.getCommandeByID(id);
        if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

        // 🔒 Sécurité
        if (req.user.Nom_role === "Client" && commande.ID_client !== req.user.ID_compte) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager || commande.ID_boutique !== manager.ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        if (req.user.Nom_role === "Employe" && commande.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        return res.status(200).json({
            message: "Commande récupérée",
            commande
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// -------------------
// Commandes par boutique
// -------------------
const getCommandeByBoutique = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "ID invalide" });

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager || manager.ID_boutique !== id) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        if (req.user.Nom_role === "Employe" && req.user.ID_boutique !== id) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const commandes = await commandeModel.getCommandesByBoutiqueID(id);

        return res.status(200).json({
            message: "Commandes récupérées",
            total: commandes.length,
            commandes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// -------------------
// Modifier commande
// -------------------
const updateCommande = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const commande = await commandeModel.getCommandeByID(id);

        if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager || commande.ID_boutique !== manager.ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        if (req.user.Nom_role === "Employe" && commande.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const updatedCommande = await commandeModel.updateCommande({ id, ...req.body });

        return res.status(200).json({
            message: "Commande mise à jour",
            updatedCommande
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// -------------------
// Supprimer commande
// -------------------
const deleteCommande = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const commande = await commandeModel.getCommandeByID(id);

        if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager || commande.ID_boutique !== manager.ID_boutique) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        if (req.user.Nom_role === "Employe" && commande.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        await commandeModel.deleteCommande(id);

        return res.status(200).json({
            message: "Commande supprimée",
            ID_commande: id
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCommandesByClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const commandes = await commandeModel.getCommandesByClientID(id);

        if (!commandes || commandes.length === 0) {
            return res.status(404).json({ message: "Aucune commande trouvée pour ce client" });
        }

        return res.status(200).json({
            message: "Commandes du client récupérées",
            total: commandes.length,
            commandes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCommande,
    getAllCommandes,
    getCommandeByID,
    getCommandeByBoutique,
    updateCommande,
    deleteCommande,
    getCommandesByClient
};