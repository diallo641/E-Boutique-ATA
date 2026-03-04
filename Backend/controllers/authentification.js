const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const compteModel = require('../models/compte');

//se connecter
const connexion = async(req, res) =>
{
    try
    {
        const {Email, Mot_de_passe} = req.body;
        if(!Email || !Mot_de_passe)
        {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }
        else
        {
            const compteexistant = await compteModel.getCompteByEmail(Email);
            if(!compteexistant)
            {
                return res.status(404).json({ message: "Compte introuvable" });

            }
            else
            {
                const passwordvalide = await bcrypt.compare(Mot_de_passe , compteexistant.Mot_de_passe);
                if(!passwordvalide)
                {
                    return res.status(401).json({ message: "Mot de passe incorrect" });
                }
                else
                {
                    const token = jwt.sign(
                        {
                            ID_compte: compteexistant.ID_compte,
                            Email: compteexistant.Email,
                            Nom_role: compteexistant.Nom_role
                        },
                        process.env.JWT_SECRET,
                        {expiresIn: "1d"}
                    );
                    return res.status(200).json(
                        {message: "Connexion réussie",
                         token,
                         user:
                         {
                            ID_compte: compteexistant.ID_compte,
                            Email: compteexistant.Email,
                            Nom_role: compteexistant.Nom_role
                         }
                        }
                    );
                }
            }
        }

    }
    catch(error)
    {
        return res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports= {connexion};