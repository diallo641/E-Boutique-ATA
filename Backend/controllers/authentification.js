const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const compteModel = require('../models/compte');
const managerModel = require('../models/manager');
const employeModel = require('../models/employe');
const clientModel = require('../models/client');

const connexion = async (req, res) => {
    try {
        const { Email, Mot_de_passe } = req.body;

        // 🔴 validation stricte
        if (!Email || !Mot_de_passe) {
            return res.status(400).json({
                message: "Email et mot de passe requis"
            });
        }

        // 🔍 recherche compte
        const compte = await compteModel.getCompteByEmail(Email);

        if (!compte) {
            return res.status(404).json({
                message: "Compte introuvable"
            });
        }

        // 🔍 DEBUG (à garder en dev uniquement)
        console.log("LOGIN EMAIL:", Email);
        console.log("LOGIN PASSWORD:", Mot_de_passe);
        console.log("COMPTE FOUND:", compte);

        // 🔥 sécurité bcrypt
        if (!compte.Mot_de_passe) {
            return res.status(500).json({
                message: "Mot de passe manquant en base"
            });
        }

        const passwordValide = await bcrypt.compare(
            Mot_de_passe,
            compte.Mot_de_passe
        );

        if (!passwordValide) {
            return res.status(401).json({
                message: "Mot de passe incorrect"
            });
        }

        // ==============================
        // 🔥 INFOS SUPPLÉMENTAIRES
        // ==============================
        let ID_boutique = null;
        let ID_employe = null;
        let ID_client = null;

        // 🔹 MANAGER
        if (compte.Nom_role === "Manager") {
            try {
                const manager = await managerModel.getManagerByCompteID(compte.ID_compte);

                if (manager) {
                    ID_boutique = manager.ID_boutique || null;
                } else {
                    console.log("⚠️ Manager introuvable pour ce compte");
                }

            } catch (err) {
                console.log("❌ Erreur manager login:", err.message);
            }
        }

        // 🔹 EMPLOYÉ
        if (compte.Nom_role === "Employe") {
            try {
                const employe = await employeModel.getEmployeByCompteID(compte.ID_compte);

                if (employe) {
                    ID_boutique = employe.ID_boutique || null;
                    ID_employe = employe.ID_employe || null;
                } else {
                    console.log("⚠️ Employé introuvable pour ce compte");
                }

            } catch (err) {
                console.log("❌ Erreur employé login:", err.message);
            }
        }

        // 🔹 CLIENT
        if (compte.Nom_role === "Client") {
            try {
                const client = await clientModel.getClientProfile(compte.ID_compte);

                if (client) {
                    ID_client = client.ID_client || null;
                } else {
                    console.log("⚠️ Client introuvable pour ce compte");
                }

            } catch (err) {
                console.log("❌ Erreur client login:", err.message);
            }
        }

        // ==============================
        // 🔥 GENERATION TOKEN
        // ==============================
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
        console.error("🔥 LOGIN ERROR:", error);
        return res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

module.exports = { connexion };