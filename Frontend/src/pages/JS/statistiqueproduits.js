const BASE_URL = "http://localhost:3000/api";

// =======================
// FETCH GENERIQUE
// =======================
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

// =======================
// PRODUITS
// =======================
export const getProduits = async () => {
    const data = await fetchData(`${BASE_URL}/produits/getAllProduits`);
    return data?.Produits || [];
};

// =======================
// STOCK PAR PRODUIT
// =======================
export const getStockByProduit = async (ID_produit) => {
    const data = await fetchData(`${BASE_URL}/stocks/stockproduit/${ID_produit}`);
    return data?.Stocks || [];
};

// =======================
// FORMAT DATE
// =======================
export const formatDateFR = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);

    return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};