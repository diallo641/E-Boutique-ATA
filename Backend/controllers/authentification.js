const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const compteModel = require('../models/compte');
const managerModel = require('../models/manager');
const employeModel = require('../models/employe');
const clientModel = require('../models/client');

// se connecter
const connexion = async (req, res) => {
    try {
        const { Email, Mot_de_passe } = req.body;

        if (!Email || !Mot_de_passe) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const compte = await compteModel.getCompteByEmail(Email);

        if (!compte) {
            return res.status(404).json({ message: "Compte introuvable" });
        }

        const passwordValide = await bcrypt.compare(Mot_de_passe, compte.Mot_de_passe);

        if (!passwordValide) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // 🔥 récupération infos complémentaires
        let ID_boutique = null;
        let ID_employe = null;
        let ID_client = null;

        if (compte.Nom_role === "Manager") {
            const manager = await managerModel.getManagerByCompteID(compte.ID_compte);
            if (manager) {
                ID_boutique = manager.ID_boutique;
                ID_employe = null;
            }
        }

        if (compte.Nom_role === "Employe") {
            const employe = await employeModel.getEmployeByCompteID(compte.ID_compte);
            if (employe) {
                ID_boutique = employe.ID_boutique;
                ID_employe = employe.ID_employe;
            }
        }

        if (compte.Nom_role === "Client") {
            const client = await clientModel.getClientProfile(compte.ID_compte);
            if (client) {
                ID_client = client.ID_client;
            }
        }

        const token = jwt.sign(
            {
                ID_compte: compte.ID_compte,
                Email: compte.Email,
                Nom_role: compte.Nom_role,
                ID_boutique,
                ID_employe,
                ID_client
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Connexion réussie",
            token,
            user: {
                ID_compte: compte.ID_compte,
                Email: compte.Email,
                Nom_role: compte.Nom_role,
                ID_boutique,
                ID_employe,
                ID_client
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error });
    }
};

module.exports = { connexion };