const employeModel = require('../models/employe');
const compteModel = require('../models/compte');
const boutiqueModel = require('../models/boutique');
const roleModel = require('../models/role');
const managerModel = require('../models/manager');
const bcrypt = require('bcrypt');


// ==================================================
// 🔹 Créer un employé
// ==================================================
const createEmploye = async (req, res) => {
    try {
        const {
            Nom,
            Prenom,
            Email,
            Adresse,
            Telephone,
            Motdepasse,
            ID_boutique,
            ID_role,
            ID_manager
        } = req.body;

        if (!Nom || !Prenom || !Email || !Adresse || !Telephone || !Motdepasse || !ID_boutique || !ID_role || !ID_manager) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        // 🔹 Vérifier rôle
        const role = await roleModel.getRoleById(ID_role);
        if (!role) {
            return res.status(409).json({ message: "Rôle inexistant" });
        }

        // 🔹 Vérifier email unique
        const emailExiste = await compteModel.getCompteByEmail(Email);
        if (emailExiste) {
            return res.status(409).json({ message: "Email déjà utilisé" });
        }

        // 🔹 Vérifier téléphone unique
        const telephoneExiste = await employeModel.getEmployeByTelephone(Telephone);
        if (telephoneExiste) {
            return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
        }

        // 🔹 Vérifier boutique
        const boutique = await boutiqueModel.getBoutiqueByID(ID_boutique);
        if (!boutique) {
            return res.status(409).json({ message: "Boutique inexistante" });
        }

        // 🔹 Vérifier manager
        const manager = await managerModel.getManagerByID(ID_manager);
        if (!manager) {
            return res.status(404).json({ message: "Manager inexistant" });
        }

        // 🔹 Vérifier que le manager appartient à la même boutique
        if (manager.ID_boutique !== ID_boutique) {
            return res.status(409).json({ message: "Ce manager n'appartient pas à cette boutique" });
        }

        // 🔹 Hasher mot de passe
        const motDePasseHash = await bcrypt.hash(Motdepasse, 10);

        // 🔹 Créer compte
        const nouveauCompte = await compteModel.createCompte(
            Email,
            motDePasseHash,
            ID_role
        );

        // 🔹 Créer employé
        const nouvelEmploye = await employeModel.createEmploye(
            Nom,
            Prenom,
            Adresse,
            Telephone,
            nouveauCompte.ID_compte,
            ID_boutique,
            ID_manager
        );

        return res.status(201).json({
            message: "Employé créé avec succès",
            Compte: {
                ID_compte: nouveauCompte.ID_compte,
                Email,
                ID_role
            },
            Employe: nouvelEmploye
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ==================================================
// 🔹 Lister tous les employés
// ==================================================
const getAllEmployes = async (req, res) => {
    try {
        const employes = await employeModel.getAllEmployes();

        if (employes.length === 0) {
            return res.status(404).json({ message: "Aucun employé trouvé" });
        }

        return res.status(200).json({
            message: "Employés récupérés avec succès",
            total: employes.length,
            employes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ==================================================
// 🔹 Employés par boutique
// ==================================================
const getEmployesByBoutique = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID boutique invalide" });
        }

        const employes = await employeModel.getEmployesByBoutiqueID(id);

        if (employes.length === 0) {
            return res.status(404).json({ message: "Aucun employé trouvé pour cette boutique" });
        }

        return res.status(200).json({
            message: "Employés récupérés avec succès",
            total: employes.length,
            employes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ==================================================
// 🔹 Employés par manager
// ==================================================
const getEmployesByManager = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID manager invalide" });
        }

        const employes = await employeModel.getEmployesByManagerID(id);

        return res.status(200).json({
            message: "Employés récupérés avec succès",
            total: employes.length,
            employes
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ==================================================
// 🔹 Récupérer un employé par ID
// ==================================================
const getEmployeByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const employe = await employeModel.getEmployeByID(id);

        if (!employe) {
            return res.status(404).json({ message: "Employé non trouvé" });
        }

        return res.status(200).json({
            message: "Employé récupéré avec succès",
            employe
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ==================================================
// 🔹 Modifier un employé
// ==================================================
const updateEmploye = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { Nom, Prenom, Email, Adresse, Telephone, ID_boutique, ID_role, Motdepasse, ID_manager } = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const employe = await employeModel.getEmployeByID(id);
        if (!employe) {
            return res.status(404).json({ message: "Employé non trouvé" });
        }

        if (Telephone) {
            const telephoneExiste = await employeModel.getEmployeByTelephone(Telephone);
            if (telephoneExiste && telephoneExiste.ID_employe !== id) {
                return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
            }
        }

        if (ID_boutique) {
            const boutique = await boutiqueModel.getBoutiqueByID(ID_boutique);
            if (!boutique) {
                return res.status(409).json({ message: "Boutique inexistante" });
            }
        }

        if (ID_manager) {
            const manager = await managerModel.getManagerByID(ID_manager);
            if (!manager) {
                return res.status(404).json({ message: "Manager inexistant" });
            }
        }

        const compte = await compteModel.getCompteByID(employe.ID_compte);

        let nouveauEmail = compte.Email;
        if (Email && Email !== compte.Email) {
            const emailExiste = await compteModel.getCompteByEmail(Email);
            if (emailExiste && emailExiste.ID_compte !== compte.ID_compte) {
                return res.status(409).json({ message: "Email déjà utilisé" });
            }
            nouveauEmail = Email;
        }

        let nouveauMotdepasse = compte.Mot_de_passe;
        if (Motdepasse) {
            nouveauMotdepasse = await bcrypt.hash(Motdepasse, 10);
        }

        let nouveauRole = compte.ID_role;
        if (ID_role) {
            const roleExistant = await roleModel.getRoleById(ID_role);
            if (!roleExistant) {
                return res.status(409).json({ message: "Rôle inexistant" });
            }
            nouveauRole = ID_role;
        }

        await compteModel.updateCompte(compte.ID_compte, nouveauEmail, nouveauMotdepasse, nouveauRole);

        const employeModifie = await employeModel.updateEmploye(
            id,
            Nom || employe.Nom,
            Prenom || employe.Prenom,
            Adresse || employe.Adresse,
            Telephone || employe.Telephone,
            ID_boutique || employe.ID_boutique,
            ID_manager || employe.ID_manager
        );

        return res.status(200).json({
            message: "Employé modifié avec succès",
            employe: employeModifie
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ==================================================
// 🔹 Supprimer un employé
// ==================================================
const deleteEmploye = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const employe = await employeModel.getEmployeByID(id);
        if (!employe) {
            return res.status(404).json({ message: "Employé non trouvé" });
        }

        await employeModel.deleteEmploye(id);

        return res.status(200).json({
            message: "Employé supprimé avec succès"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createEmploye,
    getAllEmployes,
    getEmployesByBoutique,
    getEmployesByManager,
    getEmployeByID,
    updateEmploye,
    deleteEmploye
};