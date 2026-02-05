const RoleModel = require('../models/role');


//creer un role
exports.createRole = async (req, res) =>
{
    try{
        const { nom_role, description } = req.body;

        if(!nom_role || !description){
            return res.status(400).json({ message: "nom et description sont obligatoires" });
        }
        else{
            // vérification de l'existence du rôle
            const rolexistant = await RoleModel.getRoleByName(nom_role);

            if(rolexistant){
                return res.status(409).json({
                    message: "Ce rôle existe déjà"
                });
            }

            // création du rôle
            const newRole = await RoleModel.createRole(nom_role, description);
            res.status(201).json({
                message: "Rôle créé avec succès",
                Nom: newRole.nom_role,
                Description: newRole.description
            });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

//avoir tous les rôles
exports.getAllRoles= async(req, res) =>
{
    try{
        const roles = await RoleModel.getAllRoles();
        if(roles.length === 0){
            return res.status(404).json({message: "Aucun rôle trouvé"});
        }
        else{
            return res.status(200).json({"message": "Rôles récupérés avec succès", 
                                         "Roles": roles,
                                         "Tailles": roles.length});
        }

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

//avoir un rôle par son id
exports.getRoleById = async (req, res) =>
{
    try{
        const id = parseInt(req.params.id);

        // vérification de la validité de l'id
        if(isNaN(id) || id <= 0){
            return res.status(400).json({ message: "ID invalide" });
        }

        const role = await RoleModel.getRoleById(id);

        // vérification de l'existence du rôle
        if(!role){
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        else{
            return res.status(200).json({
                message: "Rôle récupéré avec succès",
                Role: role
            });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

//editer un role
exports.updateRole = async (req, res) =>
{
    try{
        const id = parseInt(req.params.id);
        const { nom_role, description } = req.body;

        if(isNaN(id) || id <= 0){
            return res.status(400).json({ message: "ID invalide" });
        }

        if(!nom_role || !description){
            return res.status(400).json({ message: "nom et description sont obligatoires" });
        }
        else{
            const updatedRole = await RoleModel.updateRole(id, nom_role, description);

            if(!updatedRole){
                return res.status(404).json({ message: "Rôle non trouvé" });
            }

            res.status(200).json({
                message: "Rôle mis à jour avec succès",
                Role: updatedRole
            });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


//supprimer un role
exports.deleteRole = async (req, res) =>
{
    try{
        const id = parseInt(req.params.id);

        if(isNaN(id) || id <= 0){
            return res.status(400).json({ message: "ID invalide" });
        }

        const deletedRole = await RoleModel.deleteRole(id);

        if(!deletedRole){
            return res.status(404).json({ message: "Rôle non trouvé" });
        }

        res.status(200).json({
            message: "Rôle supprimé avec succès",
            Role: deletedRole
        });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


