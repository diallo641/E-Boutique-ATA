const BASE_URL = "http://localhost:3000/api";

// =====================
// FETCH GENÉRIQUE
// =====================
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

// =====================
// CLIENTS
// =====================
export const getClients = async () => {
    const data = await fetchData(`${BASE_URL}/clients/getAllClients`);
    return data?.clients || [];
};

// =====================
// EMPLOYÉS
// =====================
export const getEmployes = async () => {
    const data = await fetchData(`${BASE_URL}/employes/getAllEmployes`);
    return data?.employes || [];
};

// =====================
// MANAGERS  ✅ AJOUT IMPORTANT
// =====================
export const getManagers = async () => {
    const data = await fetchData(`${BASE_URL}/managers/getAllManagers`);
    return data?.Managers || []; // attention à la casse backend
};

// =====================
// BOUTIQUES
// =====================
export const getBoutiques = async () => {
    const data = await fetchData(`${BASE_URL}/boutiques/getAllBoutiques`);
    return data?.boutiques || [];
};

// =====================
// COMMANDES
// =====================
export const getCommandes = async () => {
    const data = await fetchData(`${BASE_URL}/commandes/getAllCommandes`);
    return data?.commandes || [];
};

// =====================
// CATEGORIES
// =====================
export const getCategories = async () => {
    const data = await fetchData(`${BASE_URL}/categories/getAllCategories`);
    return data?.categories || [];
};

// =====================
// STOCKS (⚠️ correction clé)
// =====================
export const getStocks = async () => {
    const data = await fetchData(`${BASE_URL}/stocks/getAllStocks`);
    return data?.Stocks || [];
};

// =====================
// DASHBOARD GLOBAL
// =====================
export const getDashboardStats = async () => {
    try {
        const [
            employes,
            clients,
            managers,
            boutiques,
            commandes,
            categories,
            stocks
        ] = await Promise.all([
            getEmployes(),
            getClients(),
            getManagers(),
            getBoutiques(),
            getCommandes(),
            getCategories(),
            getStocks()
        ]);

        return {
            totalEmployes: employes.length,
            totalClients: clients.length,
            totalManagers: managers.length,
            totalBoutiques: boutiques.length,
            totalCommandes: commandes.length,
            totalCategories: categories.length,
            totalStocks: stocks.length,

            employes,
            clients,
            managers,
            boutiques,
            commandes,
            categories,
            stocks
        };

    } catch (error) {
        console.error("Erreur stats :", error);

        return {
            totalEmployes: 0,
            totalClients: 0,
            totalManagers: 0,
            totalBoutiques: 0,
            totalCommandes: 0,
            totalCategories: 0,
            totalStocks: 0,

            employes: [],
            clients: [],
            managers: [],
            boutiques: [],
            commandes: [],
            categories: [],
            stocks: []
        };
    }
};