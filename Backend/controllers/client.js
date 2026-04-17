const clientModel = require('../models/client');
const compteModel = require('../models/compte');
const bcrypt = require('bcrypt');
const roleModel = require('../models/role');
const managerModel = require('../models/manager');
const employeModel = require('../models/employe');

//Inscription client (frontend)
const inscription = async (req, res) => {
    try {
        const { Nom, Adresse, Telephone, Email, Mot_de_passe, Confirm_Mot_de_passe } = req.body;

        if (!Nom || !Adresse || !Telephone || !Email || !Mot_de_passe || !Confirm_Mot_de_passe) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        if (Mot_de_passe !== Confirm_Mot_de_passe) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
        }

        if (await compteModel.getCompteByEmail(Email)) {
            return res.status(409).json({ message: "Un compte avec cet email existe déjà" });
        }

        if (await clientModel.getClientByTelephone(Telephone)) {
            return res.status(409).json({ message: "Ce numéro de téléphone est déjà utilisé" });
        }

        const hash = await bcrypt.hash(Mot_de_passe, 10);

        const roleClient = await roleModel.getRoleByName('client');
        if (!roleClient) return res.status(500).json({ message: "Rôle client introuvable" });

        const nouveauCompte = await compteModel.createCompte(Email, hash, roleClient.ID_role);
        const nouveauClient = await clientModel.createClient(Nom, Adresse, Telephone, nouveauCompte.ID_compte);

        return res.status(201).json({
            message: "Inscription réussie",
            Compte: { ID_compte: nouveauCompte.ID_compte, Email },
            Client: nouveauClient
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//CRUD classique pour Admin / Manager / Employé
const createclient = async (req, res) => {
    try {
        const { Nom, Adresse, Telephone, Email, Mot_de_passe, ID_role, ID_boutique } = req.body;

        if (!Nom || !Adresse || !Telephone || !Email || !Mot_de_passe || !ID_role) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        const roleExistant = await roleModel.getRoleById(ID_role);
        if (!roleExistant) return res.status(404).json({ message: "Rôle inexistant" });

        if (await compteModel.getCompteByEmail(Email)) return res.status(409).json({ message: "Email déjà utilisé" });
        if (await clientModel.getClientByTelephone(Telephone)) return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });

        if (req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") {
            if (!ID_boutique || ID_boutique !== req.user.ID_boutique) {
                return res.status(403).json({ message: "Vous ne pouvez créer que des clients pour votre boutique" });
            }
        }

        const hash = await bcrypt.hash(Mot_de_passe, 10);
        const nouveauCompte = await compteModel.createCompte(Email, hash, ID_role);
        const nouveauClient = await clientModel.createClient(Nom, Adresse, Telephone, nouveauCompte.ID_compte);

        return res.status(201).json({
            message: "Client créé avec succès",
            Compte: { ID_compte: nouveauCompte.ID_compte, Email, ID_role },
            Client: nouveauClient
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Récupérer tous les clients
const getAllClients = async (req, res) => {
    try {
        let clients;

        // 🔥 MANAGER
        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager) {
                return res.status(404).json({ message: "Manager introuvable" });
            }

            clients = await clientModel.getClientsByBoutiqueID(manager.ID_boutique);
        }

        // 🔥 EMPLOYE
        else if (req.user.Nom_role === "Employe") {
            clients = await clientModel.getClientsByBoutiqueID(req.user.ID_boutique);
        }

        // 🔥 ADMIN
        else {
            clients = await clientModel.getAllClients();
        }

        return res.status(200).json({
            message: "Clients récupérés",
            total: clients.length,
            clients
        });

    } catch (error) {
        console.error("Erreur getAllClients :", error);
        return res.status(500).json({ message: error.message });
    }
};
//Récupérer un client par ID
const getClientByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const client = await clientModel.getClientByID(id);
        if (!client) return res.status(404).json({ message: "Client non trouvé" });

        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") && client.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Vous ne pouvez voir que les clients de votre boutique" });
        }

        return res.status(200).json({ client });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Modifier un client (Admin)
const updateClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { Nom, Adresse, Telephone } = req.body;

        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const clientExistant = await clientModel.getClientByID(id);
        if (!clientExistant) return res.status(404).json({ message: "Client non trouvé" });

        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") && clientExistant.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Vous ne pouvez modifier que les clients de votre boutique" });
        }

        if (Telephone && Telephone !== clientExistant.Telephone) {
            const telExistant = await clientModel.getClientByTelephone(Telephone);
            if (telExistant) return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
        }

        const clientModifie = await clientModel.updateClient(
            id,
            Nom || clientExistant.Nom,
            Adresse || clientExistant.Adresse,
            Telephone || clientExistant.Telephone
        );

        return res.status(200).json({ message: "Client modifié avec succès", client: clientModifie });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Modifier un client
const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id); 
        const { Nom, Adresse, Telephone, Email, Mot_de_passe } = req.body;

        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        // 🔹 Récupérer le client et le compte existants
        const clientExistant = await clientModel.getClientByID(id);
        if (!clientExistant) return res.status(404).json({ message: "Client non trouvé" });

        const compteExistant = await compteModel.getCompteByID(clientExistant.ID_compte);
        if (!compteExistant) return res.status(404).json({ message: "Compte associé non trouvé" });

        // 🔹 Contrôle pour Manager/Employé : ne peut modifier que ses clients
        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") &&
            clientExistant.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Vous ne pouvez modifier que les clients de votre boutique" });
        }

        // 🔹 Vérifier l'unicité du téléphone
        if (Telephone && Telephone !== clientExistant.Telephone) {
            const telExistant = await clientModel.getClientByTelephone(Telephone);
            if (telExistant && telExistant.ID_client !== id) {
                return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
            }
        }

        // 🔹 Vérifier l'unicité de l'email
        let nouvelEmail = compteExistant.Email;
        if (Email && Email !== compteExistant.Email) {
            const emailExiste = await compteModel.getCompteByEmail(Email);
            if (emailExiste && emailExiste.ID_compte !== compteExistant.ID_compte) {
                return res.status(409).json({ message: "Email déjà utilisé" });
            }
            nouvelEmail = Email;
        }

        // 🔹 Vérifier et hash du mot de passe si fourni
        let nouveauMotDePasse = compteExistant.Mot_de_passe;
        if (Mot_de_passe) {
            nouveauMotDePasse = await bcrypt.hash(Mot_de_passe, 10);
        }

        // 🔹 Mettre à jour le compte
        await compteModel.updateCompte(
            compteExistant.ID_compte,
            nouvelEmail,
            nouveauMotDePasse,
            compteExistant.ID_role // garder le rôle existant
        );

        // 🔹 Mettre à jour le client
        const clientModifie = await clientModel.updateClientProfile(
            compteExistant.ID_compte,
            Nom || clientExistant.Nom,
            Adresse || clientExistant.Adresse,
            Telephone || clientExistant.Telephone
        );

        return res.status(200).json({
            message: "Client mis à jour avec succès",
            client: clientModifie,
            Email: nouvelEmail
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

//Supprimer un client
const deleteClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const clientExistant = await clientModel.getClientByID(id);
        if (!clientExistant) return res.status(404).json({ message: "Client non trouvé" });

        if ((req.user.Nom_role === "Manager" || req.user.Nom_role === "Employe") && clientExistant.ID_boutique !== req.user.ID_boutique) {
            return res.status(403).json({ message: "Vous ne pouvez supprimer que les clients de votre boutique" });
        }

        const clientSupprime = await clientModel.deleteClient(id);
        return res.status(200).json({ message: "Client supprimé avec succès", client: clientSupprime });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Voir le profil du client connecté
const getProfile = async (req, res) => {
    try {
        console.log("req.user :", req.user); 
        const ID_compte = req.user.ID_compte;
        const client = await clientModel.getClientProfile(ID_compte);
        if (!client) return res.status(404).json({ message: "Profil non trouvé" });
        return res.status(200).json({ client });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const updateProfile = async (req, res) => {
    try {
        const ID_compte = req.user.ID_compte;

        // Récupérer le client et le compte existants
        const clientExistant = await clientModel.getClientProfile(ID_compte);
        const compteExistant = await compteModel.getCompteByID(ID_compte);

        if (!clientExistant || !compteExistant) {
            return res.status(404).json({ message: "Profil non trouvé" });
        }

        const { Nom, Adresse, Telephone, Email, Mot_de_passe } = req.body;

        // 🔹 Vérifier et mettre à jour l'email
        let nouvelEmail = compteExistant.Email;
        if (Email && Email !== compteExistant.Email) {
            const emailExiste = await compteModel.getCompteByEmail(Email);
            if (emailExiste && emailExiste.ID_compte !== ID_compte) {
                return res.status(409).json({ message: "Email déjà utilisé" });
            }
            nouvelEmail = Email;
        }

        // 🔹 Vérifier et mettre à jour le mot de passe
        let nouveauMotDePasse = compteExistant.Mot_de_passe;
        if (Mot_de_passe) {
            nouveauMotDePasse = await bcrypt.hash(Mot_de_passe, 10);
        }

        // 🔹 Mettre à jour la table compte
        await compteModel.updateCompte(
            ID_compte,
            nouvelEmail,
            nouveauMotDePasse,
            compteExistant.ID_role
        );

        // 🔹 Vérifier le téléphone
        if (Telephone && Telephone !== clientExistant.Telephone) {
            const telExistant = await clientModel.getClientByTelephone(Telephone);
            if (telExistant && telExistant.ID_client !== clientExistant.ID_client) {
                return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
            }
        }

        // 🔹 Mettre à jour la table client
        const clientModifie = await clientModel.updateClientProfile(
            ID_compte,
            Nom || clientExistant.Nom,
            Adresse || clientExistant.Adresse,
            Telephone || clientExistant.Telephone
        );

        return res.status(200).json({
            message: "Profil mis à jour avec succès",
            client: clientModifie,
            Email: nouvelEmail
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};





module.exports = { updateProfile };
//Export de toutes les fonctions
module.exports = {
    inscription,
    createclient,
    getAllClients,
    getClientByID,
    updateClient,
    update,
    deleteClient,
    getProfile,
    updateProfile,
   
}