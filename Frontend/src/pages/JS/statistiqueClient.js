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
 * 🔹 Récupère les commandes du client connecté
 * (VERSION CORRIGÉE)
 */
export const getCommandesClient = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/commandes/mes-commandes`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    // sécurité : éviter erreur HTML -> JSON
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erreur getCommandesClient:", error);
    return { commandes: [] };
  }
};

/**
 * 🔹 Formate une date en français
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
 * 🔹 Charge profil + commandes (dashboard client)
 */
export const fetchClientData = async () => {
  const profileData = await getProfile();

  if (!profileData.client) {
    return null;
  }

  const commandesData = await getCommandesClient();

  return {
    client: profileData.client,
    commandes: commandesData.commandes || [],
  };
};

/**
 * 🔹 Redirection vers page commande
 */
export const AjouterCommande = async () => {
  window.location.href = "/AjouterCommande";
};