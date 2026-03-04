const RoleModel = require('../models/role');


// Créer un rôle
exports.createRole = async (req, res) => {
    try {
        //Vérifier que c'est un Admin
        if (req.user.Nom_role !== "Admin") {
            return res.status(403).json({ message: "Seul un Admin peut créer un rôle" });
        }

        const { nom_role, description } = req.body;
        if (!nom_role || !description) {
            return res.status(400).json({ message: "nom et description sont obligatoires" });
        }

        const rolexistant = await RoleModel.getRoleByName(nom_role);
        if (rolexistant) {
            return res.status(409).json({ message: "Ce rôle existe déjà" });
        }

        const newRole = await RoleModel.createRole(nom_role, description);
        res.status(201).json({
            message: "Rôle créé avec succès",
            Nom: newRole.nom_role,
            Description: newRole.description
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Lister tous les rôles (lecture autorisée pour tous)
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await RoleModel.getAllRoles();
        if (roles.length === 0) {
            return res.status(404).json({ message: "Aucun rôle trouvé" });
        }

        res.status(200).json({
            message: "Rôles récupérés avec succès",
            Roles: roles,
            Tailles: roles.length
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Récupérer un rôle par ID (lecture autorisée pour tous)
exports.getRoleById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const role = await RoleModel.getRoleById(id);
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }

        res.status(200).json({
            message: "Rôle récupéré avec succès",
            Role: role
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Mettre à jour un rôle
exports.updateRole = async (req, res) => {
    try {
        if (req.user.Nom_role !== "Admin") {
            return res.status(403).json({ message: "Seul un Admin peut modifier un rôle" });
        }

        const id = parseInt(req.params.id);
        const { nom_role, description } = req.body;
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }
        if (!nom_role || !description) {
            return res.status(400).json({ message: "nom et description sont obligatoires" });
        }

        const updatedRole = await RoleModel.updateRole(id, nom_role, description);
        if (!updatedRole) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }

        res.status(200).json({
            message: "Rôle mis à jour avec succès",
            Role: updatedRole
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Supprimer un rôle
exports.deleteRole = async (req, res) => {
    try {
        if (req.user.Nom_role !== "Admin") {
            return res.status(403).json({ message: "Seul un Admin peut supprimer un rôle" });
        }

        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const deletedRole = await RoleModel.deleteRole(id);
        if (!deletedRole) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }

        res.status(200).json({
            message: "Rôle supprimé avec succès",
            Role: deletedRole
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};