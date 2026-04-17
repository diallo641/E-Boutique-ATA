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
//CLIENTS
export const getClients = async () => {
    const data = await fetchData(`${BASE_URL}/clients/getAllClients`);
    return data?.clients || [];
};

