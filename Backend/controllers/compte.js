const CompteModel = require('../models/compte');
const bcrypt = require('bcrypt');
const RoleModel = require('../models/role');


// Ajouter un compte
exports.createCompte = async (req, res) => {
    try {
        const { Email, Mot_de_passe, ID_role } = req.body;

        if (!Email || !Mot_de_passe || !ID_role) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        // Vérifier email
        const emailExistant = await CompteModel.getCompteByEmail(Email);
        if (emailExistant) {
            return res.status(409).json({ message: "Email déjà utilisé" });
        }

        // Vérifier rôle
        const roleExistant = await RoleModel.getRoleById(ID_role);
        if (!roleExistant) {
            return res.status(404).json({ message: "Rôle inexistant" });
        }

        const passwordHash = await bcrypt.hash(Mot_de_passe, 10);
        const compte = await CompteModel.createCompte(Email, passwordHash, ID_role);

        res.status(201).json({
            message: "Compte créé avec succès",
            compte
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Tous les comptes (avec nom du rôle)
exports.getAllComptes = async (req, res) => {
    try {
        const comptes = await CompteModel.getAllComptes();

        if (comptes.length === 0) {
            return res.status(404).json({ message: "Aucun compte trouvé" });
        }

        res.status(200).json({
            message: "Comptes récupérés",
            total: comptes.length,
            comptes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =====================
// Un compte par ID
// =====================
exports.getCompteByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const compte = await CompteModel.getCompteByID(id);
        if (!compte) {
            return res.status(404).json({ message: "Compte non trouvé" });
        }

        res.status(200).json(compte);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =====================
// Modifier un compte
// =====================
exports.updateCompte = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { Email, Mot_de_passe, ID_role } = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const compteExistant = await CompteModel.getCompteByID(id);
        if (!compteExistant) {
            return res.status(404).json({ message: "Compte non trouvé" });
        }

        // 🔹 Vérifier email unique si modifié
        if (Email) {
            const emailExiste = await CompteModel.getCompteByEmail(Email);
            if (emailExiste && emailExiste.ID_compte !== id) {
                return res.status(409).json({ message: "Email déjà utilisé" });
            }
        }

        // 🔹 Vérifier rôle si fourni
        if (ID_role) {
            const roleExistant = await RoleModel.getRoleById(ID_role);
            if (!roleExistant) {
                return res.status(404).json({ message: "Rôle inexistant" });
            }
        }

        // 🔹 Hash uniquement si mot de passe fourni
        let passwordHash = compteExistant.Mot_de_passe;
        if (Mot_de_passe) {
            passwordHash = await bcrypt.hash(Mot_de_passe, 10);
        }

        const comptemodifier = await CompteModel.updateCompte(
            id,
            Email || compteExistant.Email,
            passwordHash,
            ID_role || compteExistant.ID_role
        );

        res.status(200).json({
            message: "Compte mis à jour",
            compte: comptemodifier
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =====================
// Supprimer un compte
// =====================
exports.deleteCompte = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const deleted = await CompteModel.deleteCompte(id);
        if (!deleted) {
            return res.status(404).json({ message: "Compte non trouvé" });
        }

        res.status(200).json({ message: "Compte supprimé" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
