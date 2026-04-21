const jwt = require('jsonwebtoken');

const authentification = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({ message: "Token manquant" });
        }

        const token = header.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token invalide" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 NORMALISATION IMPORTANTE ICI
        req.user = {
            ID_compte: decode.ID_compte,
            Nom_role: decode.Nom_role,
            ID_boutique: decode.ID_boutique || null,
            ID_employe: decode.ID_employe || null,
            ID_client: decode.ID_client || null
        };

        next();

    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
};

module.exports = authentification;