const checkrole = (rolesautorises) =>
{
    return (req, res, next) =>
    {
        if(!req.user)
        {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }
        else
        {
            const userrole = req.user.Nom_role;
            console.log("USER TOKEN :", req.user);
            if(!rolesautorises.includes(userrole))
            {
                return res.status(403).json({ message: "Accès interdit : rôle pas autorisé" });
            }
            else
            {
                
                next();
            }
        }
    }
};

module.exports = checkrole;