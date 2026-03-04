const commandeModel = require('../models/commande');
const clientModel = require('../models/client');
const employeModel = require('../models/employe');
const boutiqueModel = require('../models/boutique');


// Créer une commande
const createCommande = async (req, res) => {
    try {
        const { Total, Statut_commande = 'En cours', Mode_paiement, ID_client, ID_employe, ID_boutique } = req.body;

        if (Total === undefined || !Statut_commande || !Mode_paiement || !ID_client || !ID_employe || !ID_boutique) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        const clientExistant = await clientModel.getClientByID(ID_client);
        if (!clientExistant) return res.status(404).json({ message: "Client inexistant" });

        const employeExistant = await employeModel.getEmployeByID(ID_employe);
        if (!employeExistant) return res.status(404).json({ message: "Employé inexistant" });

        const boutiqueExistant = await boutiqueModel.getBoutiqueByID(ID_boutique);
        if (!boutiqueExistant) return res.status(404).json({ message: "Boutique inexistante" });

        //Vérification rôle pour Client/Manager/Employé
        if (req.user.Nom_role === "Client" && req.user.ID_compte !== ID_client) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") && req.user.ID_boutique !== ID_boutique) {
            return res.status(403).json({ message: "Vous ne pouvez pas créer de commande pour une autre boutique" });
        }

        const nouvelleCommande = await commandeModel.createCommande({ Total, Statut_commande, Mode_paiement, ID_client, ID_employe, ID_boutique });
        return res.status(201).json({ message: "Commande créée avec succès", Commande: nouvelleCommande });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Lister toutes les commandes
const getAllCommandes = async (req, res) => {
    try {
        let commandes = await commandeModel.getAllCommandes();

        if (req.user.Nom_role === "Client") {
            commandes = commandes.filter(c => c.ID_client === req.user.ID_compte);
        } else if (req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") {
            commandes = commandes.filter(c => c.ID_boutique === req.user.ID_boutique);
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


// Récupérer une commande par ID
const getCommandeByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const commande = await commandeModel.getCommandeByID(id);
        if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

        if (req.user.Nom_role === "Client" && commande.ID_client !== req.user.ID_compte) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") && commande.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        return res.status(200).json({ message: "Commande récupérée", commande });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Commandes par boutique
const getCommandeByBoutique = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") && req.user.ID_boutique !== id) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const commandes = await commandeModel.getCommandeByBoutique(id);
        return res.status(200).json({
            message: "Commandes récupérées",
            total: commandes.length,
            commandes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Commandes par employé
const getCommandeByEmploye = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const commandes = await commandeModel.getCommandeByEmploye(id);

        if (req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") {
            const managerBoutique = req.user.ID_boutique;
            commandes = commandes.filter(c => c.ID_boutique === managerBoutique);
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


// Commandes par client
const getCommandesClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        if (req.user.Nom_role === "Client" && req.user.ID_compte !== id) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const commandes = await commandeModel.getCommandesClient(id);
        return res.status(200).json({
            message: "Commandes récupérées",
            total: commandes.length,
            commandes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Modifier une commande
const updateCommande = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const commande = await commandeModel.getCommandeByID(id);
        if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

        if (req.user.Nom_role === "Client" && commande.ID_client !== req.user.ID_compte) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") && commande.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const updatedCommande = await commandeModel.updateCommande({ id, ...req.body });
        return res.status(200).json({ message: "Commande mise à jour", updatedCommande });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Supprimer une commande
const deleteCommande = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const commande = await commandeModel.getCommandeByID(id);
        if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

        if (req.user.Nom_role === "Client" && commande.ID_client !== req.user.ID_compte) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") && commande.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        await commandeModel.deleteCommande(id);
        return res.status(200).json({ message: "Commande supprimée", ID_commande: id });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Export des fonctions
module.exports = {
    createCommande,
    getCommandeByID,
    getCommandeByBoutique,
    getCommandeByEmploye,
    getCommandesClient,
    getAllCommandes,
    updateCommande,
    deleteCommande
};