const clientModel = require('../models/client');
const compteModel = require('../models/compte');
const bcrypt = require('bcrypt');
const roleModel = require('../models/role');

// ================================
// Inscription client lambda pour la partie frontend
// ================================
const inscription = async (req, res) => {
    try {
        const { Nom, Adresse, Telephone, Email, Mot_de_passe, Confirm_Mot_de_passe } = req.body;

        // Vérification des champs
        if (!Nom || !Adresse || !Telephone || !Email || !Mot_de_passe || !Confirm_Mot_de_passe) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        if (Mot_de_passe !== Confirm_Mot_de_passe) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
        }

        // Vérifier email existant
        const emailExistant = await compteModel.getCompteByEmail(Email);
        if (emailExistant) {
            return res.status(409).json({ message: "Un compte avec cet email existe déjà" });
        }

        // Vérifier téléphone unique
        const telExistant = await clientModel.getClientByTelephone(Telephone);
        if (telExistant) {
            return res.status(409).json({ message: "Ce numéro de téléphone est déjà utilisé" });
        }

        // Hachage du mot de passe
        const hash = await bcrypt.hash(Mot_de_passe, 10);

        // Récupérer l'ID du rôle 'client'
        const roleClient = await roleModel.getRoleByName('client');
        if (!roleClient) {
            return res.status(500).json({ message: "Rôle client introuvable dans la base" });
        }

        // Créer le compte
        const nouveauCompte = await compteModel.createCompte(Email, hash, roleClient.ID_role);

        // Créer le profil client
        const nouveauClient = await clientModel.createClient(Nom, Adresse, Telephone, nouveauCompte.insertId);

        return res.status(201).json({
            message: "Inscription réussie",
            Compte: { ID_compte: nouveauCompte.insertId, Email },
            Client: nouveauClient
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ================================
// CRUD classique pour Admin ou API
// ================================
//Creer un client (sans inscription, juste pour l'admin)
const createclient = async(req, res) =>
{
    try{
        const {Nom, Adresse, Telephone,Email, Mot_de_passe,  ID_role} = req.body;
        if(!Nom || !Adresse || !Telephone || !Email || !Mot_de_passe || !ID_role)
        {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }
        else
        {
            const rolexistant = await roleModel.getRoleById(ID_role);
            if(!rolexistant)
            {
                return res.status(404).json({ message: "Rôle inexistant" });
            }
            else
            {
                const emailexistant = await compteModel.getCompteByEmail(Email);
                if(emailexistant)
                {
                    return res.status(409).json({ message: "Email déjà utilisé" });
                }
                else
                {
                    const telephoneexistant = await clientModel.getClientByTelephone(Telephone);
                    if(telephoneexistant)
                    {
                        return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
                    }
                    else{
                        const hachermotdepasse = await bcrypt.hash(Mot_de_passe, 10);
                        const nouveaucompte = await compteModel.createCompte(Email, hachermotdepasse, ID_role);
                        const nouveauclient = await clientModel.createClient(Nom, Adresse, Telephone, nouveaucompte.ID_compte);  
                        return res.status(200).json({message: "Client créé avec succès", Compte: {ID_compte: nouveaucompte.ID_compte, Email, ID_role}, Client: nouveauclient});
                    }
                }
            }
        }
        

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
}

// Récupérer tous les clients
const getAllClients = async (req, res) => {
    try {
        const clients = await clientModel.getAllClients();
        if (clients.length === 0) {
            return res.status(404).json({ message: "Aucun client trouvé" });
        }
        return res.status(200).json({ clients, total: clients.length });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Récupérer un client par ID
const getClientByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const client = await clientModel.getClientByID(id);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        return res.status(200).json({ client });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// Modifier un client
const updateClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { Nom, Adresse, Telephone, ID_compte } = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const clientExistant = await clientModel.getClientByID(id);
        if (!clientExistant) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        // Vérifier si le téléphone est changé et unique
        if (Telephone && Telephone !== clientExistant.Telephone) {
            const telExistant = await clientModel.getClientByTelephone(Telephone);
            if (telExistant) {
                return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
            }
        }

        // Mise à jour du client
        const clientModifie = await clientModel.updateClient(
            id,
            Nom || clientExistant.Nom,
            Adresse || clientExistant.Adresse,
            Telephone || clientExistant.Telephone,
            ID_compte || clientExistant.ID_compte
        );

        return res.status(200).json({ message: "Client modifié avec succès", client: clientModifie });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Supprimer un client
const deleteClient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0)
             {
                  return res.status(400).json({ message: "ID invalide" });
           }
        const clientExistant = await clientModel.getClientByID(id);
        if (!clientExistant) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        const clientSupprime = await clientModel.deleteClient(id);
        return res.status(200).json({ message: "Client supprimé avec succès", client: clientSupprime });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Exporter toutes les fonctions
module.exports = {
    inscription,
    createclient,
    getAllClients,
    getClientByID,
    updateClient,
    deleteClient
};
