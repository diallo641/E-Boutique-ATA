
export const deconnexion = () => {
    //Supprimer le token ou informations de session
    localStorage.removeItem("token"); 
    localStorage.removeItem("userRole"); 
    sessionStorage.clear(); 
    //Rediriger vers la page de connexion
    window.location.href = "/Connexion";
};