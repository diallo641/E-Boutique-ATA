const commandeModel = require('../models/commande');
const clientModel = require('../models/client');
const managerModel = require('../models/manager');
const boutiqueModel = require('../models/boutique');
const employeModel = require('../models/employe');

// -------------------
// CRÉER UNE COMMANDE
// -------------------
const createCommande = async (req, res) => {
    try {
        let { Total, Mode_paiement, ID_boutique } = req.body;

        // =========================
        // VALIDATION ROBUSTE
        // =========================
        Total = Number(Total);
        ID_boutique = Number(ID_boutique);

        if (isNaN(Total) || Total <= 0 || !Mode_paiement || isNaN(ID_boutique)) {
            return res.status(400).json({ message: "Champs invalides ou incomplets" });
        }

        console.log("BODY COMMANDE:", req.body);
        console.log("USER:", req.user);

        // =========================
        // CLIENT
        // =========================
        const client = await clientModel.getClientProfile(req.user.ID_compte);

        if (!client) {
            return res.status(404).json({ message: "Client introuvable" });
        }

        // =========================
        // BOUTIQUE
        // =========================
        console.log("TOKEN USER:", req.user);
        const boutique = await boutiqueModel.getBoutiqueByID(ID_boutique);

        if (!boutique) {
            return res.status(404).json({ message: "Boutique inexistante" });
        }

        let ID_employe = null;

        // =========================
        // EMPLOYE CHECK
        // =========================
        if (req.user.Nom_role === "Employe") {

            const employe = await employeModel.getEmployeByCompteID(req.user.ID_compte);

            if (!employe) {
                return res.status(404).json({ message: "Employé introuvable" });
            }

            if (Number(employe.ID_boutique) !== ID_boutique) {
                return res.status(403).json({ message: "Accès interdit boutique" });
            }

            ID_employe = employe.ID_employe;
        }

        // =========================
        // CREATION COMMANDE
        // =========================
        const nouvelleCommande = await commandeModel.createCommande({
            Total,
            Statut_commande: "En attente",
            Mode_paiement,
            ID_client: client.ID_client,
            ID_employe,
            ID_boutique
        });

        if (!nouvelleCommande) {
            return res.status(500).json({ message: "Erreur création commande" });
        }

        return res.status(201).json({
            message: "Commande créée avec succès",
            Commande: nouvelleCommande
        });

    } catch (error) {
        console.error("CREATE COMMANDE ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// LISTE COMMANDES
// -------------------
const getAllCommandes = async (req, res) => {
    try {
        let commandes;

        if (req.user.Nom_role === "Client") {
            const client = await clientModel.getClientProfile(req.user.ID_compte);
            commandes = await commandeModel.getCommandesByClientID(client.ID_client);
        }

        else if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            commandes = await commandeModel.getCommandesByBoutiqueID(manager.ID_boutique);
        }

        else if (req.user.Nom_role === "Employe") {
            const employe = await employeModel.getEmployeByCompteID(req.user.ID_compte);
            commandes = await commandeModel.getCommandesByBoutiqueID(employe.ID_boutique);
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
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// GET BY ID (sécurisé)
// -------------------
const getCommandeByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const commande = await commandeModel.getCommandeByID(id);

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        // sécurité client
        if (req.user.Nom_role === "Client") {
            const client = await clientModel.getClientProfile(req.user.ID_compte);

            if (commande.ID_client !== client.ID_client) {
                return res.status(403).json({ message: "Accès interdit" });
            }
        }

        return res.status(200).json({
            commande
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// MES COMMANDES (CLIENT)
// -------------------
const getMyCommandes = async (req, res) => {
    try {
        const client = await clientModel.getClientProfile(req.user.ID_compte);

        if (!client) {
            return res.status(404).json({ message: "Client introuvable" });
        }

        const commandes = await commandeModel.getCommandesByClientID(client.ID_client);

        return res.status(200).json({
            message: "Mes commandes",
            total: commandes.length,
            commandes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// UPDATE
// -------------------
const updateCommande = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const commande = await commandeModel.getCommandeByID(id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        const updated = await commandeModel.updateCommande({
            id,
            ...req.body
        });

        return res.status(200).json({
            message: "Commande mise à jour",
            updatedCommande: updated
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// -------------------
// DELETE
// -------------------
const deleteCommande = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const commande = await commandeModel.getCommandeByID(id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
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


// -------------------
// EXPORT
// -------------------
module.exports = {
    createCommande,
    getAllCommandes,
    getCommandeByID,
    updateCommande,
    deleteCommande,
    getMyCommandes
};