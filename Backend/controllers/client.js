const ClientModel = require('../models/client');
const CompteModel = require('../models/compte');

// ==============================
// Créer un client
// ==============================
exports.createClient = async (req, res) => {
    try {
        const { Nom, Adresse, Telephone, ID_compte } = req.body;

        if (!Nom || !Adresse || !Telephone || !ID_compte) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }
        else {
            const compteexistant = await CompteModel.getCompteByID(ID_compte);
            if (!compteexistant) {
                return res.status(404).json({ message: "Le compte spécifié n'existe pas" });
            }
            else {
                const clientexistant = await ClientModel.getClientByCompteID(ID_compte);
                if (clientexistant) {
                    return res.status(409).json({ message: "Ce compte a déjà un client associé" });
                }
                else {
                    const telephoneExistant = await ClientModel.getClientByTelephone(Telephone);
                    if (telephoneExistant) {
                        return res.status(409).json({ message: "Ce numéro de téléphone est déjà utilisé" });
                    }
                    else {
                        const nouveauClient = await ClientModel.createClient(
                            Nom,
                            Adresse,
                            Telephone,
                            ID_compte
                        );

                        return res.status(201).json({
                            message: "Client créé avec succès",
                            Client: nouveauClient
                        });
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ==============================
// Tous les clients
// ==============================
exports.getAllClients = async (req, res) => {
    try {
        const clients = await ClientModel.getAllClients();
        if (clients.length === 0) {
            return res.status(404).json({ message: "Aucun client trouvé" });
        }
        else {
            return res.status(200).json({
                message: "Clients récupérés avec succès",
                total: clients.length,
                clients
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ==============================
// Client par ID
// ==============================
exports.getClientByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide, doit être un entier positif" });
        }
        else {
            const client = await ClientModel.getClientByID(id);
            if (!client) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            else {
                return res.status(200).json({
                    message: "Client récupéré avec succès",
                    Client: client
                });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ==============================
// Modifier un client
// ==============================
exports.updateClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { Nom, Adresse, Telephone, ID_compte } = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide, doit être un entier positif" });
        }
        else {
            const clientexistant = await ClientModel.getClientByID(id);
            if (!clientexistant) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            else {
                const compteexistant = await CompteModel.getCompteByID(ID_compte);
                if (!compteexistant) {
                    return res.status(404).json({ message: "Le compte spécifié n'existe pas" });
                }
                else {
                    const telephoneExistant = await ClientModel.getClientByTelephone(Telephone);
                    if (telephoneExistant && telephoneExistant.ID_client !== id) {
                        return res.status(409).json({ message: "Ce numéro de téléphone est déjà utilisé" });
                    }
                    else {
                        const clientModifie = await ClientModel.updateClient(
                            id,
                            Nom,
                            Adresse,
                            Telephone,
                            ID_compte
                        );

                        return res.status(200).json({
                            message: "Client mis à jour avec succès",
                            Client: clientModifie
                        });
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ==============================
// Supprimer un client
// ==============================
exports.deleteClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide, doit être un entier positif" });
        }
        else {
            const clientSupprime = await ClientModel.deleteClient(id);
            if (!clientSupprime) {
                return res.status(404).json({ message: "Client non trouvé" });
            }
            else {
                return res.status(200).json({
                    message: "Client supprimé avec succès",
                    Client: clientSupprime
                });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
