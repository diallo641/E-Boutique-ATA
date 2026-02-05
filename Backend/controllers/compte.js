const CompteModel = require('../models/compte');
const bcrypt = require('bcrypt');
const RoleModel = require('../models/role');

//Ajouter un compte
exports.createCompte = async (req, res) => 
{
    try{
        const {Email, Mot_de_passe, ID_role} = req.body;
        if(!Email || !Mot_de_passe || !ID_role) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }
        else{
            //Verifier l'existance de l'email
            const emailexistant = await CompteModel.getCompteByEmail(Email)
            if(emailexistant)
            {
                return res.status(409).json({message: "Un compte avec cet email existe déjà"})
            }
            else
            {
                //On verifie l'existance du role
                const roleexistant = await RoleModel.getRoleById(ID_role);
                if(!roleexistant)
                {
                    return res.status(409).json({message: "Le rôle spécifié n'existe pas"})
                }
                else
                {
                    const salsround= 20;
                    const hacherpassword = await bcrypt.hash(Mot_de_passe, salsround);
                    const nouveaucompte = await CompteModel.createCompte(Email, hacherpassword, ID_role);
                    return res.status(200).json({message: "Compte créé avec succès", 
                                                 Compte: {ID_compte: nouveaucompte.insertId,
                                                          Email: nouveaucompte.Email,
                                                          ID_role: nouveaucompte.ID_role
                                                 }
                    })
                }
            }
        }

    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du compte' });
    }
};

//Recuperer tous les comptes
exports.getAllComptes = async(req, res) =>
{
    try{
        const comptes = await CompteModel.getAllComptes();
        if(comptes.length==0)
        {
            return res.status(404).json({message: "Aucun compte trouvé"})
        }
        else{
            return res.status(200).json({message: "Comptes récupérés avec succès",
                                        comptes,
                                        Tailles: comptes.length
            })
        }

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

//recuperer un seul compte
exports.getCompteByID = async(req, res) =>
{
    try{
        const id = req.params.id;
        if (isNaN(id) || id <= 0)
        {
            return res.status(400).json({ message: "ID invalide, doit être un entier positif" });
        }
        const comptechercher = await CompteModel.getCompteByID(id)
        if(!comptechercher)
        {
            return res.status(404).json({message: "Compte non trouvé"})
        }
        else
        {
            return res.status(200).json({message: "Compte récupéré avec succès", comptechercher})
        }

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }

};

//Modifier un compte 
exports.updateCompte = async(req, res) =>
{
    try{
        const id = parseInt(req.params.id);
        const { Email, Mot_de_passe, ID_role } = req.body;
         if (isNaN(id) || id <= 0)
        {
            return res.status(400).json({ message: "ID invalide, doit être un entier positif" });
        }
        //Verifier si le compte existe 
        const compteexistant = await CompteModel.getCompteByID(ID_role);
        if(!compteexistant)
        {
            return res.status(404).json({ message: "Compte non trouvé" });
        }
        else
        {
            //verifier le role
            const roleexistant = await RoleModel.getRoleById(id);
            if(!roleexistant)
            {
                return res.status(404).json({ message: "Rôle inexistant" });
            }
            else
            {
                const hacherpassword = await bcrypt.hash(Mot_de_passe, 20);
                const UpdatedCompte = await CompteModel.updateCompte(
                    id, Email, hacherpassword, ID_role
                )
                return res.status(200).json({message: "Compte mis à jour avec succès", 
                                            Compte: UpdatedCompte
                })
            }
        }


    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
};

//Supprimer un compte
exports.deleteCompte = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
         if (isNaN(id) || id <= 0)
        {
            return res.status(400).json({ message: "ID invalide, doit être un entier positif" });
        }
        const comptesupprimer = await CompteModel.deleteCompte(id);
        if(!comptesupprimer)
        {
            return res.status(404).json({message: "Compte non trouvé"})
        }
        else
        {
            res.status(200).json(comptesupprimer);
        }

    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}