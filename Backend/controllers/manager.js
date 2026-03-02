const managerModel = require('../models/manager');
const compteModel = require('../models/compte');
const roleModel = require('../models/role');
const bcrypt = require('bcrypt');
const boutiqueModel = require('../models/boutique');

//Ajouter un manager 
const createManager = async(req, res) =>
{
    try
    {
        const {Nom, Prenom,Email,  Adresse, Telephone, Motdepasse, ID_boutique, ID_role} = req.body;
        if(!Nom || !Prenom || !Email || !Adresse || !Telephone || !Motdepasse || !ID_boutique || !ID_role)
        {
            return res.status(400).json({message: "Tous les champs sont requis"});
        }
        else
        {
            const emailexistant = await compteModel.getCompteByEmail(Email);
            if(emailexistant)
            {
                return res.status(409).json({message: "Email existant"});
            }
            else
            {
                const telephoneexistant = await managerModel.getManagerByTelephone(Telephone);
                if(telephoneexistant)
                {
                    return res.status(409).json({message: "Numero deja existant"});
                }
                else
                {
                    const boutique = await boutiqueModel.getBoutiqueByID(ID_boutique);
                    if(!boutique)
                    {
                        return res.status(404).json({message: "Boutique choisit n'existe pas en base"});
                    }
                    else
                    {
                        const role = await roleModel.getRoleById(ID_role);
                        if(!role)
                        {
                            return res.status(404).json({message: "Role inexistant"});
                        }
                        const hacherpassword = await bcrypt.hash(Motdepasse, 10);
                        const nouveaucompte = await compteModel.createCompte(Email, hacherpassword, ID_role);
                        const nouveaumanger = await managerModel.createManager(Nom, Prenom, Adresse, Telephone, nouveaucompte.ID_compte, ID_boutique);
                        return res.status(201).json({
                            message: "Manager créé avec succès",
                            Compte: {ID_compte : nouveaucompte.ID_compte, Email, ID_role},
                            Manager: nouveaumanger
                        })
                    }
                }
            }
        }
    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Lister les manger
const getAllManagers = async(req, res) =>
{
    try
    {
        const managers = await managerModel.getAllManagers();
        if(managers.length==0)
        {
            return res.status(200).json({
                message: "Aucun manager trouvé",
                Total: 0,
                Managers:[]
            })
        }
        else
        {
            return res.status(200).json({
                message: "Voici la liste trouvé",
                Total: managers.length,
                managers
            })
        }
    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Avoir un seul manager
const getManagerByID = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(404).json({message: "ID invalide"});
        }
        else
        {
            const managerexistant = await managerModel.getManagerByID(id);
            if(!managerexistant)
            {
                return res.status(404).json({message: "Manager n'existe pas"})
            }
            else
            {
                return res.status(200).json({message: "Voici le manager: ", managerexistant})
            }
        }
    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Modifier un manager
const updatemanager = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        const {Nom, Prenom, Adresse, Telephone, ID_boutique, Email, ID_role} = req.body;

        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"})
        }

        const managerexistant = await managerModel.getManagerByID(id);
        if(!managerexistant)
        {
            return res.status(404).json({message: "Le Manager n'existe pas"})
        }

        if(Telephone)
        {
            const telephonexistant = await managerModel.getManagerByTelephone(Telephone);
            if(telephonexistant && telephonexistant.ID_manager !== id)
            {
                return res.status(409).json({message: "Numéro de téléphone déjà utilisé"});
            }
        }

        if(ID_boutique)
        {
            const boutiqueexistant = await boutiqueModel.getBoutiqueByID(ID_boutique);
            if(!boutiqueexistant)
            {
                return res.status(400).json({message: "Boutique inexistante"});
            }
        }

        const compte = await compteModel.getCompteByID(managerexistant.ID_compte);
        if(!compte)
        {
            return res.status(409).json({message: "Compte inexistant"});
        }

        let nouvelEmail = compte.Email;
        if(Email && Email !== compte.Email)
        {
            const emailexiste = await compteModel.getCompteByEmail(Email);
            if(emailexiste && emailexiste.ID_compte !== managerexistant.ID_compte)
            {
                return res.status(409).json({message: "Email déjà utilisé"});
            }
            nouvelEmail = Email;
        }

        let nouveauRole = compte.ID_role;
        if(ID_role)
        {
            const role = await roleModel.getRoleById(ID_role);
            if(!role)
            {
                return res.status(404).json({message: "Role inexistant"})
            }
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

        return res.status(200).json({message: "Manager modifié avec succès", manager: managermodifier});
    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Supprimer un manager
const deleteManager = async(req, res) =>
{
    try
    {
        const id= parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }

        const managerchercher = await managerModel.getManagerByID(id);
        if(!managerchercher)
        {
            return res.status(404).json({message: "Manager inexistant"})
        }

        await managerModel.deleteManager(id);
        return res.status(200).json({message: "Manager supprimé avec succés"})
    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

//Les employes dirigés par un manager
const getEmployesByManager = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        const employes = await managerModel.getEmployesByManagerID(id);
        return res.status(200).json({message: "Employés récupérés avec succès", employes, total: employes.length});
    }
    catch(error)
    {
        return res.status(500).json({message: error.message});
    }
};

//Expoter les fonctions 
module.exports = 
{
    createManager,
    getAllManagers,
    getManagerByID,
    updatemanager,
    deleteManager,
    getEmployesByManager
}