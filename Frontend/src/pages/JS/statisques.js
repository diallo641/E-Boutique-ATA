const BASE_URL = "http://localhost:3000/api";

//Fonction générique avec token
const fetchData = async (url) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/Connexion";
            return null;
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur API");
        }

        return data;

    } catch (error) {
        console.error("Erreur :", error);
        return null;
    }
};


//COMPTES

export const getComptes = async () => {
    const data = await fetchData(`${BASE_URL}/comptes/getAllComptes`);
    return data?.comptes || [];
};


//CLIENTS

export const getClients = async () => {
    const data = await fetchData(`${BASE_URL}/clients/getAllClients`);
    return data?.clients || [];
};


//MANAGERS
export const getManagers = async () => {
    const data = await fetchData(`${BASE_URL}/managers/getAllManagers`);
    return data?.Managers || [];
};


//EMPLOYÉS
export const getEmployes = async () => {
    const data = await fetchData(`${BASE_URL}/employes/getAllEmployes`);
    return data?.employes || [];
};


//BOUTIQUES
export const getBoutiques = async () => {
    const data = await fetchData(`${BASE_URL}/boutiques/getAllBoutiques`);
    console.log("Boutiques récupérées :", data?.boutiques);
    return data?.boutiques || [];
};


//COMMANDES
export const getCommandes = async () => {
    const data = await fetchData(`${BASE_URL}/commandes/getAllCommandes`);
    return data?.commandes || [];
};


//STATS GLOBAL DASHBOARD
export const getDashboardStats = async () => {
    try {
        const [
            comptes,
            clients,
            managers,
            employes,
            commandes,
            boutiques
        ] = await Promise.all([
            getComptes(),
            getClients(),
            getManagers(),
            getEmployes(),
            getCommandes(),
            getBoutiques()
        ]);

        return {
            totalComptes: comptes.length,
            totalClients: clients.length,
            totalManagers: managers.length,
            totalEmployes: employes.length,
            totalCommandes: commandes.length,
            totalBoutiques: boutiques.length,

            comptes,
            clients,
            managers,
            employes,
            commandes,
            boutiques
        };

    } catch (error) {
        console.error("Erreur stats :", error);
        return {
            totalComptes: 0,
            totalClients: 0,
            totalManagers: 0,
            totalEmployes: 0,
            totalCommandes: 0,
            totalBoutiques: 0,
            comptes: [],
            clients: [],
            managers: [],
            employes: [],
            commandes: [],
            boutiques: []
        };
    }
};