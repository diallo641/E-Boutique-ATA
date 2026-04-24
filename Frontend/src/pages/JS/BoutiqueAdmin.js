const API_URL = "http://localhost:3000/api/boutiques";

// 🔹 Récupérer toutes les boutiques
export const getBoutiques = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/getAllBoutiques`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Erreur getBoutiques:", error);
    return null;
  }
};


// 🔹 Ajouter une boutique
export const ajouterBoutique = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/ajouterboutique`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Erreur ajouterBoutique:", error);
    return null;
  }
};


// 🔹 Supprimer une boutique
export const supprimerBoutique = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/supprimerboutique/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Erreur supprimerBoutique:", error);
    return null;
  }
};


// 🔹 Récupérer une seule boutique
export const getBoutiqueById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/uneboutique/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Erreur getBoutiqueById:", error);
    return null;
  }
};


// 🔹 Modifier une boutique
export const updateBoutique = async (id, formData) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/editerboutique/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Erreur updateBoutique:", error);
    return null;
  }
};