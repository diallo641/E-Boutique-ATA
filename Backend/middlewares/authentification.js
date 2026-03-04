const jwt = require('jsonwebtoken');
const authentification = (req, res, next) =>
{
    try
    {
        const header = req.headers.authorization;
        if(!header)
        {
            return res.status(401).json({ message: "Token manquant" });
        }
        else
        {
            const token = header.split(" ")[1];
            if(!token)
            {
                return res.status(401).json({ message: "Token invalide" });
            }
            else
            {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                req.user= decode;
                next();

            }
            
        }

    }
    catch(error)
    {
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
};

module.exports = authentification;