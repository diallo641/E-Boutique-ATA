const managerModel = require('../models/manager');
const compteModel = require('../models/compte');
const roleModel = require('../models/role');
const bcrypt = require('bcrypt');
const boutiqueModel = require('../models/boutique');

// =====================
// Ajouter un manager
// =====================
const createManager = async (req, res) => {
    try {
        if (req.user.Nom_role !== "Admin") {
            return res.status(403).json({ message: "Seul un Admin peut créer un manager" });
        }

        const { Nom, Prenom, Email, Adresse, Telephone, Motdepasse, ID_boutique, ID_role } = req.body;
        if (!Nom || !Prenom || !Email || !Adresse || !Telephone || !Motdepasse || !ID_boutique || !ID_role) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        const emailexistant = await compteModel.getCompteByEmail(Email);
        if (emailexistant) return res.status(409).json({ message: "Email existant" });

        const telephoneexistant = await managerModel.getManagerByTelephone(Telephone);
        if (telephoneexistant) return res.status(409).json({ message: "Numéro déjà existant" });

        const boutique = await boutiqueModel.getBoutiqueByID(ID_boutique);
        if (!boutique) return res.status(404).json({ message: "Boutique inexistante" });

        const role = await roleModel.getRoleById(ID_role);
        if (!role) return res.status(404).json({ message: "Rôle inexistant" });

        const hacherpassword = await bcrypt.hash(Motdepasse, 10);
        const nouveaucompte = await compteModel.createCompte(Email, hacherpassword, ID_role);
        const nouveaumanger = await managerModel.createManager(Nom, Prenom, Adresse, Telephone, nouveaucompte.ID_compte, ID_boutique);

        return res.status(201).json({
            message: "Manager créé avec succès",
            Compte: { ID_compte: nouveaucompte.ID_compte, Email, ID_role },
            Manager: nouveaumanger
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Lister tous les managers
const getAllManagers = async (req, res) => {
    try {
        const managers = await managerModel.getAllManagers();
        return res.status(200).json({
            message: managers.length ? "Voici la liste" : "Aucun manager trouvé",
            Total: managers.length,
            Managers: managers
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Récupérer un manager par ID
const getManagerByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const manager = await managerModel.getManagerByID(id);
        if (!manager) {
            return res.status(404).json({ message: "Manager inexistant" });
        }

        // 🔥 récupérer compte lié
        const compte = await compteModel.getCompteByID(manager.ID_compte);

        if (!compte) {
            return res.status(404).json({ message: "Compte inexistant" });
        }

        return res.status(200).json({
            message: "Manager récupéré avec succès",
            manager: {
                ...manager,
                Email: compte.Email,
                ID_role: compte.ID_role
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Modifier un manager
const updatemanager = async (req, res) => {
    try {
        if (req.user.Nom_role !== "Admin") {
            return res.status(403).json({ message: "Seul un Admin peut modifier un manager" });
        }

        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const managerexistant = await managerModel.getManagerByID(id);
        if (!managerexistant) return res.status(404).json({ message: "Manager inexistant" });

        const { Nom, Prenom, Adresse, Telephone, ID_boutique, Email, ID_role } = req.body;

        // 🔹 Vérifier téléphone
        if (Telephone) {
            const telephonexistant = await managerModel.getManagerByTelephone(Telephone);
            if (telephonexistant && telephonexistant.ID_manager !== id) {
                return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
            }
        }

        //Vérifier boutique
        if (ID_boutique) {
            const boutiqueexistant = await boutiqueModel.getBoutiqueByID(ID_boutique);
            if (!boutiqueexistant) return res.status(400).json({ message: "Boutique inexistante" });
        }

        //Vérifier email et rôle
        const compte = await compteModel.getCompteByID(managerexistant.ID_compte);
        if (!compte) return res.status(404).json({ message: "Compte inexistant" });

        let nouvelEmail = compte.Email;
        if (Email && Email !== compte.Email) {
            const emailexiste = await compteModel.getCompteByEmail(Email);
            if (emailexiste && emailexiste.ID_compte !== managerexistant.ID_compte) {
                return res.status(409).json({ message: "Email déjà utilisé" });
            }
            nouvelEmail = Email;
        }

        let nouveauRole = compte.ID_role;
        if (ID_role) {
            const role = await roleModel.getRoleById(ID_role);
            if (!role) return res.status(404).json({ message: "Rôle inexistant" });
            nouveauRole = ID_role;
        }

        await compteModel.updateCompte(managerexistant.ID_compte, nouvelEmail, compte.Mot_de_passe, nouveauRole);

        const managermodifier = await managerModel.updateManager(
            id,
            Nom || managerexistant.Nom,
            Prenom || managerexistant.Prenom,
            Adresse || managerexistant.Adresse,
            Telephone || managerexistant.Telephone,
            ID_boutique || managerexistant.ID_boutique
        );

        return res.status(200).json({ message: "Manager modifié avec succès", manager: managermodifier });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Supprimer un manager
const deleteManager = async (req, res) => {
    try {
        if (req.user.Nom_role !== "Admin") {
            return res.status(403).json({
                message: "Seul un Admin peut supprimer un manager"
            });
        }

        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                message: "ID invalide"
            });
        }

        const manager = await managerModel.getManagerByID(id);

        if (!manager) {
            return res.status(404).json({
                message: "Manager inexistant"
            });
        }

        // 🔥 suppression manager
        await managerModel.deleteManager(id);

        // 🔥 suppression compte associé
        if (manager.ID_compte) {
            await compteModel.deleteCompte(manager.ID_compte);
        }

        return res.status(200).json({
            message: "Manager supprimé avec succès"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};




// Les employés dirigés par un manager
const getEmployesByManager = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const employes = await managerModel.getEmployesByManagerID(id);
        return res.status(200).json({
            message: "Employés récupérés avec succès",
            total: employes.length,
            employes
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getManagersByBoutique = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID boutique invalide" });
    }

    const managers = await managerModel.getManagersByBoutique(id);

    return res.status(200).json({
      message: "Managers récupérés",
      managers
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createManager,
    getAllManagers,
    getManagerByID,
    updatemanager,
    deleteManager,
    getEmployesByManager,
    getManagersByBoutique
};