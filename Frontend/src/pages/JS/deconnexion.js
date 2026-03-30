

export const deconnexion = () => {
    //Supprimer le token ou informations de session
    localStorage.removeItem("token"); // si tu stockes un token JWT
    localStorage.removeItem("userRole"); // si tu stockes le rôle de l'utilisateur
    sessionStorage.clear(); // nettoyer tout le sessionStorage si besoin

    //Rediriger vers la page de connexion
    window.location.href = "/Connexion";
};