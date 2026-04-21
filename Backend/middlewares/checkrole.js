const checkrole = (rolesautorises) => {
    return (req, res, next) => {

        if (!req.user || !req.user.Nom_role) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const userrole = req.user.Nom_role;

        if (!rolesautorises.includes(userrole)) {
            return res.status(403).json({
                message: "Accès interdit : rôle non autorisé"
            });
        }

        next();
    };
};

module.exports = checkrole;