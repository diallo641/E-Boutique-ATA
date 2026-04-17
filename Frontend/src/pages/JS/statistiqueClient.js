// services/statistiqueClient.js
const BASE_URL = "http://localhost:3000/api";

/**
 * 🔹 Récupère le profil du client
 */
export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/clients/profil`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return await res.json();
  } catch (error) {
    console.error("Erreur getProfile:", error);
    return { client: null };
  }
};

/**
 * 🔹 Met à jour le profil du client
 * @param {Object} data - { Nom, Adresse, Telephone }
 */
export const updateProfile = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/clients/editerprofil`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.error("Erreur updateProfile:", error);
    return { client: null };
  }
};

/**
 * 🔹 Récupère toutes les commandes d'un client
 * @param {number} id - ID du client
 */
export const getCommandesClient = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/commandes/getCommandesByClient/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return await res.json();
  } catch (error) {
    console.error("Erreur getCommandesClient:", error);
    return { commandes: [] };
  }
};

/**
 * 🔹 Formate une date en français
 * @param {string} dateStr
 */
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

/**
 * 🔹 Fonction combinée pour récupérer profil + commandes
 * Utilisée dans le composant React pour simplifier le code
 */
export const fetchClientData = async () => {
  const profileData = await getProfile();
  if (!profileData.client) return null;

  const commandesData = await getCommandesClient(profileData.client.ID_client);
  return {
    client: profileData.client,
    commandes: commandesData.commandes || [],
  };
};


export const  AjouterCommande = async () => {
  window.location.href = "/AjouterCommande";
};