const boutiqueModel = require('../models/boutique');
const managerModel = require('../models/manager');

//Ajouter une boutique
const ajouterBoutique = async(req, res) =>
{
    try{
        const {Nom_boutique, Email, Adresse, Telephone} = req.body;
        if(!Nom_boutique || !Email || !Adresse || !Telephone)
        {
            return res.status(400).json({message: "Tous les champs sont requis"});
        }
        else
        {
            //Verifier l'email
            const emailexistant = await boutiqueModel.getBoutiqueByEmail(Email);
            if(emailexistant)
            {
                return res.status(409).json({message: "Email deja utilisé"});
            }
            else
            {
                //Verifier le telephone
                const telephoneexistant = await boutiqueModel.getBoutiqueByTelephone(Telephone);
                if(telephoneexistant)
                {
                    return res.status(409).json({message : "Numero de telephone deja utilisé"});
                }
                else
                {
                    const nouvelleboutique = await boutiqueModel.createBoutique(Nom_boutique, Email, Adresse, Telephone);
                    return res.status(201).json({message: "Boutique créée avec succès", Boutique: nouvelleboutique});
                }
            }
        }

    }
    catch(error)
    {
            return res.status(500).json({ message: error.message });
    }
};

//Toutes les boutiques
const getAllBoutiques = async (req, res) => {
    try {
        let boutiques;

        // 🔥 MANAGER
        if (req.user.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(req.user.ID_compte);
            if (!manager) {
                return res.status(404).json({ message: "Manager introuvable" });
            }

            const boutique = await boutiqueModel.getBoutiqueByID(manager.ID_boutique);

            boutiques = boutique ? [boutique] : [];
        }

        // 🔥 EMPLOYE
        else if (req.user.Nom_role === "Employe") {
            const boutique = await boutiqueModel.getBoutiqueByID(req.user.ID_boutique);
            boutiques = boutique ? [boutique] : [];
        }

        // 🔥 ADMIN
        else {
            boutiques = await boutiqueModel.getAllBoutiques();
        }

        return res.status(200).json({
            message: "Boutiques récupérées",
            total: boutiques.length,
            boutiques
        });

    } catch (error) {
        console.error("Erreur getAllBoutiques :", error);
        return res.status(500).json({ message: error.message });
    }
};
//Avoir une seule boutique
const getBoutiqueById = async (req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
            {
                return res.status(400).json({message: "ID invalide"});
            } 
            else
            {
                const boutique = await boutiqueModel.getBoutiqueByID(id);
                if(!boutique)
                {
                    return res.status(404).json({message: "Boutique non trouvée"});
                }
                else
                {
                    return res.status(200).json({message: "Voici la boutique", boutique: boutique});
                }
            }

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }     
};

// Modifier une boutique
const updateBoutique = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const boutiqueExistante = await boutiqueModel.getBoutiqueByID(id);
        if (!boutiqueExistante) {
            return res.status(404).json({ message: "Boutique non trouvée" });
        }

        // On récupère les nouvelles valeurs OU on garde les anciennes
        const Nom_boutique = req.body.Nom_boutique || boutiqueExistante.Nom_boutique;
        const Email = req.body.Email || boutiqueExistante.Email;
        const Adresse = req.body.Adresse || boutiqueExistante.Adresse;
        const Telephone = req.body.Telephone || boutiqueExistante.Telephone;

        // Vérification unicité email
        const emailExistant = await boutiqueModel.getBoutiqueByEmail(Email);
        if (emailExistant && emailExistant.ID_boutique !== id) {
            return res.status(409).json({ message: "Email déjà utilisé" });
        }

        // Vérification unicité téléphone
        const telephoneExistant = await boutiqueModel.getBoutiqueByTelephone(Telephone);
        if (telephoneExistant && telephoneExistant.ID_boutique !== id) {
            return res.status(409).json({ message: "Numéro de téléphone déjà utilisé" });
        }

        const boutiqueUpdate = await boutiqueModel.updateBoutique(
            id,
            Nom_boutique,
            Email,
            Adresse,
            Telephone
        );

        return res.status(200).json({
            message: "Boutique modifiée avec succès",
            Boutique: boutiqueUpdate
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Supprimer une boutique
const deleteBoutique = async(req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);
        if(isNaN(id) || id<=0)
        {
            return res.status(400).json({message: "ID invalide"});
        }
        else
        {
            const boutiqueexistant = await boutiqueModel.getBoutiqueByID(id);
            if(!boutiqueexistant)
            {
                return res.status(404).json({message: "Boutique non trouvée"});
            }
            else
            {
                const boutiquesupprimer = await boutiqueModel.deleteBoutique(id);
                return res.status(200).json({message: "Boutique supprimée avec succès", boutique: boutiquesupprimer});
            }
        }

    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }
};

module.exports =
{
    ajouterBoutique,
    getAllBoutiques,
    getBoutiqueById,
    updateBoutique,
    deleteBoutique
}


