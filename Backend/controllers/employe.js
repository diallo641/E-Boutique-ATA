const employeModel = require('../models/employe');
const compteModel = require('../models/compte');
const boutiqueModel = require('../models/boutique');
const roleModel = require('../models/role');
const managerModel = require('../models/manager');
const produitModel = require('../models/produit');
const stockModel = require('../models/stock');
const commandeModel = require('../models/commande');
const clientModel = require('../models/client');
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

        // 🔥 conversion des IDs (IMPORTANT)
        const boutiqueId = Number(ID_boutique);
        const roleId = Number(ID_role);
        const managerId = Number(ID_manager);

        // 🔹 validation champs
        if (
            !Nom ||
            !Prenom ||
            !Email ||
            !Adresse ||
            !Telephone ||
            !Motdepasse ||
            !boutiqueId ||
            !roleId ||
            !managerId
        ) {
            return res.status(400).json({
                message: "Tous les champs sont requis"
            });
        }

        // 🔹 vérifier rôle
        const role = await roleModel.getRoleById(roleId);
        if (!role) {
            return res.status(409).json({
                message: "Rôle inexistant"
            });
        }

        // 🔹 email unique
        const emailExist = await compteModel.getCompteByEmail(Email);
        if (emailExist) {
            return res.status(409).json({
                message: "Email déjà utilisé"
            });
        }

        // 🔹 téléphone unique
        const telExist = await employeModel.getEmployeByTelephone(Telephone);
        if (telExist) {
            return res.status(409).json({
                message: "Numéro déjà utilisé"
            });
        }

        // 🔹 vérifier boutique
        const boutique = await boutiqueModel.getBoutiqueByID(boutiqueId);
        if (!boutique) {
            return res.status(409).json({
                message: "Boutique inexistante"
            });
        }

        // 🔹 vérifier manager
        const manager = await managerModel.getManagerByID(managerId);
        if (!manager) {
            return res.status(404).json({
                message: "Manager inexistant"
            });
        }

        // 🔥 FIX IMPORTANT (comparaison propre)
        if (Number(manager.ID_boutique) !== boutiqueId) {
            return res.status(409).json({
                message: "Manager n'appartient pas à cette boutique"
            });
        }

        // 🔹 contrôle rôle connecté
        if (
            req.user.Nom_role === "Manager" &&
            req.user.ID_compte !== manager.ID_compte
        ) {
            return res.status(403).json({
                message: "Un manager ne peut créer que ses propres employés"
            });
        }

        // 🔹 hash password
        const motDePasseHash = await bcrypt.hash(Motdepasse, 10);

        // 🔹 création compte
        const nouveauCompte = await compteModel.createCompte(
            Email,
            motDePasseHash,
            roleId
        );

        // 🔹 création employé
        const nouvelEmploye = await employeModel.createEmploye(
            Nom,
            Prenom,
            Adresse,
            Telephone,
            nouveauCompte.ID_compte,
            boutiqueId,
            managerId
        );

        return res.status(201).json({
            message: "Employé créé avec succès",
            Compte: {
                ID_compte: nouveauCompte.ID_compte,
                Email,
                ID_role: roleId
            },
            Employe: nouvelEmploye
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
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

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const employe = await employeModel.getEmployeByID(id);

        if (!employe) {
            return res.status(404).json({ message: "Employé non trouvé" });
        }

        // 🔥 COMPTE (IMPORTANT)
        const compte = await compteModel.getCompteByID(employe.ID_compte);

        if (!compte) {
            return res.status(404).json({ message: "Compte introuvable" });
        }

        // 🔥 MANAGER
        const manager = await managerModel.getManagerByID(employe.ID_manager);

        if (!manager) {
            return res.status(404).json({ message: "Manager introuvable" });
        }

        // 🔐 sécurité manager
        if (
            req.user.Nom_role === "Manager" &&
            req.user.ID_compte !== manager.ID_compte
        ) {
            return res.status(403).json({
                message: "Un manager ne peut voir que ses propres employés"
            });
        }

        return res.status(200).json({
            message: "Employé récupéré avec succès",
            employe: {
                ...employe,
                Email: compte.Email,         // ✅ AJOUT IMPORTANT
                ID_role: compte.ID_role,     // optionnel mais utile
                ID_compte_manager: manager.ID_compte
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




//Modifier un employé

const updateEmploye = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const {
            Nom,
            Prenom,
            Email,
            Adresse,
            Telephone,
            ID_boutique,
            ID_role,
            Motdepasse,
            ID_manager
        } = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const employe = await employeModel.getEmployeByID(id);
        if (!employe) {
            return res.status(404).json({ message: "Employé non trouvé" });
        }

        const compte = await compteModel.getCompteByID(employe.ID_compte);
        if (!compte) {
            return res.status(404).json({ message: "Compte introuvable" });
        }

        // 🔥 EMAIL UNIQUE
        let nouveauEmail = compte.Email;

        if (Email && Email !== compte.Email) {
            const emailExiste = await compteModel.getCompteByEmail(Email);

            if (emailExiste && emailExiste.ID_compte !== compte.ID_compte) {
                return res.status(409).json({ message: "Email déjà utilisé" });
            }

            nouveauEmail = Email;
        }

        // 🔥 PASSWORD
        let nouveauMotdepasse = compte.Mot_de_passe;

        if (Motdepasse) {
            nouveauMotdepasse = await bcrypt.hash(Motdepasse, 10);
        }

        // 🔥 ROLE
        let nouveauRole = compte.ID_role;

        if (ID_role) {
            const role = await roleModel.getRoleById(ID_role);
            if (!role) {
                return res.status(409).json({ message: "Rôle inexistant" });
            }
            nouveauRole = ID_role;
        }

        // 🔥 BOUTIQUE + MANAGER VALIDATION
        let boutiqueId = employe.ID_boutique;
        let managerId = employe.ID_manager;

        if (ID_boutique) {
            const boutique = await boutiqueModel.getBoutiqueByID(ID_boutique);
            if (!boutique) {
                return res.status(409).json({ message: "Boutique inexistante" });
            }
            boutiqueId = ID_boutique;
        }

        if (ID_manager) {
            const manager = await managerModel.getManagerByID(ID_manager);
            if (!manager) {
                return res.status(404).json({ message: "Manager inexistant" });
            }

            // 🔥 IMPORTANT FIX
            if (Number(manager.ID_boutique) !== Number(boutiqueId)) {
                return res.status(409).json({
                    message: "Manager n'appartient pas à cette boutique"
                });
            }

            managerId = ID_manager;
        }

        // 🔥 UPDATE COMPTE
        await compteModel.updateCompte(
            compte.ID_compte,
            nouveauEmail,
            nouveauMotdepasse,
            nouveauRole
        );

        // 🔥 UPDATE EMPLOYE
        const employeModifie = await employeModel.updateEmploye(
            id,
            Nom || employe.Nom,
            Prenom || employe.Prenom,
            Adresse || employe.Adresse,
            Telephone || employe.Telephone,
            boutiqueId,
            managerId
        );

        return res.status(200).json({
            message: "Employé modifié avec succès",
            employe: employeModifie
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



//supprimer un employé
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

        // 🔥 sécurité manager
        if (
            req.user.Nom_role === "Manager" &&
            req.user.ID_compte !== employe.ID_manager
        ) {
            return res.status(403).json({
                message: "Un manager ne peut supprimer que ses propres employés"
            });
        }

        // 🔥 suppression cascade (employé + compte)
        await employeModel.deleteEmploye(
            id,
            employe.ID_compte
        );

        return res.status(200).json({
            message: "Employé supprimé avec succès"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



const getDashboardEmploye = async (req, res) => {
  try {
    const ID_compte = req.user.ID_compte;

    const employe = await employeModel.getEmployeByCompteID(ID_compte);

    if (!employe) {
      return res.status(404).json({ message: "Employé introuvable" });
    }

    const ID_boutique = employe.ID_boutique;

    // 🔥 STOCK (déjà suffisant pour produits + quantité)
    const stock = await stockModel.getStockByBoutique(ID_boutique);

    // 🔥 COMMANDES
    const commandes = await commandeModel.getCommandesByBoutique?.(ID_boutique) || [];

    // 🔥 CLIENTS (si tu as la fonction)
    const clients = await clientModel.getClientsByBoutique?.(ID_boutique) || [];

    return res.status(200).json({
      employe,
      boutique: ID_boutique,
      stock,
      commandes,
      clients
    });

  } catch (error) {
    console.error("Dashboard employé error:", error);
    return res.status(500).json({
      message: "Erreur dashboard employé",
      error: error.message
    });
  }
};



module.exports = {
    createEmploye,
    getAllEmployes,
    getEmployesByBoutique,
    getEmployesByManager,
    getEmployeByID,
    updateEmploye,
    deleteEmploye,
    getDashboardEmploye
};