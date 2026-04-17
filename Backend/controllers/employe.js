const employeModel = require('../models/employe');
const compteModel = require('../models/compte');
const boutiqueModel = require('../models/boutique');
const roleModel = require('../models/role');
const managerModel = require('../models/manager');
const bcrypt = require('bcrypt');


//Créer un employé
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

        const role = await roleModel.getRoleById(ID_role);
        if (!role) return res.status(409).json({ message: "Rôle inexistant" });

        if (await compteModel.getCompteByEmail(Email)) return res.status(409).json({ message: "Email déjà utilisé" });
        if (await employeModel.getEmployeByTelephone(Telephone)) return res.status(409).json({ message: "Numéro déjà utilisé" });

        const boutique = await boutiqueModel.getBoutiqueByID(ID_boutique);
        if (!boutique) return res.status(409).json({ message: "Boutique inexistante" });
        const manager = await managerModel.getManagerByID(ID_manager);
        if (!manager) return res.status(404).json({ message: "Manager inexistant" });
        if (manager.ID_boutique !== ID_boutique) return res.status(409).json({ message: "Manager n'appartient pas à cette boutique" });

        //Contrôle rôle utilisateur connecté
        if (req.user.Nom_role === "Manager" && req.user.ID_compte !== manager.ID_compte) {
            return res.status(403).json({ message: "Un manager ne peut créer que ses propres employés" });
        }

        const motDePasseHash = await bcrypt.hash(Motdepasse, 10);
        const nouveauCompte = await compteModel.createCompte(Email, motDePasseHash, ID_role);
        const nouvelEmploye = await employeModel.createEmploye(Nom, Prenom, Adresse, Telephone, nouveauCompte.ID_compte, ID_boutique, ID_manager);
        return res.status(201).json({
            message: "Employé créé avec succès",
            Compte: { ID_compte: nouveauCompte.ID_compte, Email, ID_role },
            Employe: nouvelEmploye
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Lister tous les employés
const getAllEmployes = async (req, res) => {
    try {
        let employes;

        if (req.user.Nom_role === "Manager") {
            // Récupérer l'ID_manager correspondant au compte connecté
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager) {
                return res.status(404).json({ message: "Manager introuvable" });
            }

            // Récupérer les employés rattachés à ce manager
            employes = await employeModel.getEmployesByManagerID(manager.ID_manager);
        } else {
            // Admin voit tous les employés
            employes = await employeModel.getAllEmployes();
        }

        return res.status(200).json({
            message: "Employés récupérés avec succès",
            total: employes.length,
            employes
        });

    } catch (error) {
        console.error("Erreur getAllEmployes :", error);
        return res.status(500).json({ message: error.message });
    }
};




//Employés par boutique

const getEmployesByBoutique = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID boutique invalide" });

        const employes = await employeModel.getEmployesByBoutiqueID(id);

        if (req.user.Nom_role === "Manager") {
            // Filtrer les employés qui appartiennent au manager
            employes = employes.filter(e => e.ID_manager === req.user.ID_compte);
        }

        if (employes.length === 0) return res.status(404).json({ message: "Aucun employé trouvé pour cette boutique" });

        return res.status(200).json({ message: "Employés récupérés", total: employes.length, employes });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//Employés par manager

const getEmployesByManager = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID manager invalide" });

        if (req.user.Nom_role === "Manager" && req.user.ID_compte !== id) {
            return res.status(403).json({ message: "Un manager ne peut voir que ses propres employés" });
        }

        const employes = await employeModel.getEmployesByManagerID(id);

        return res.status(200).json({ message: "Employés récupérés avec succès", total: employes.length, employes });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//Récupérer un employé par ID

const getEmployeByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const employe = await employeModel.getEmployeByID(id);
        if (!employe) return res.status(404).json({ message: "Employé non trouvé" });

        if (req.user.Nom_role === "Manager" && req.user.ID_compte !== employe.ID_manager) {
            return res.status(403).json({ message: "Un manager ne peut voir que ses propres employés" });
        }

        return res.status(200).json({ message: "Employé récupéré avec succès", employe });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//Modifier un employé

const updateEmploye = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { Nom, Prenom, Email, Adresse, Telephone, ID_boutique, ID_role, Motdepasse, ID_manager } = req.body;

        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const employe = await employeModel.getEmployeByID(id);
        if (!employe) return res.status(404).json({ message: "Employé non trouvé" });

        if (req.user.Nom_role === "Manager" && req.user.ID_compte !== employe.ID_manager) {
            return res.status(403).json({ message: "Un manager ne peut modifier que ses propres employés" });
        }

        const compte = await compteModel.getCompteByID(employe.ID_compte);

        // Email unique
        let nouveauEmail = Email && Email !== compte.Email ? Email : compte.Email;
        if (Email && Email !== compte.Email) {
            const emailExiste = await compteModel.getCompteByEmail(Email);
            if (emailExiste && emailExiste.ID_compte !== compte.ID_compte) {
                return res.status(409).json({ message: "Email déjà utilisé" });
            }
            
        }

        let nouveauMotdepasse = Motdepasse ? await bcrypt.hash(Motdepasse, 10) : compte.Mot_de_passe;
        let nouveauRole = ID_role || compte.ID_role;
        if (ID_role) {
            const roleExistant = await roleModel.getRoleById(ID_role);
            if (!roleExistant) return res.status(409).json({ message: "Rôle inexistant" });
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

        return res.status(200).json({ message: "Employé modifié avec succès", employe: employeModifie });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//supprimer un employé

const deleteEmploye = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID invalide" });

        const employe = await employeModel.getEmployeByID(id);
        if (!employe) return res.status(404).json({ message: "Employé non trouvé" });

        if (req.user.Nom_role === "Manager" && req.user.ID_compte !== employe.ID_manager) {
            return res.status(403).json({ message: "Un manager ne peut supprimer que ses propres employés" });
        }

        await employeModel.deleteEmploye(id);

        return res.status(200).json({ message: "Employé supprimé avec succès" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createEmploye,
    getAllEmployes,
    getEmployesByBoutique,
    getEmployesByManager,
    getEmployeByID,
    updateEmploye,
    deleteEmploye
};