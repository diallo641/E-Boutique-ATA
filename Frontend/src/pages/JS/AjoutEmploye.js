const BASE_URL = "http://localhost:3000/api";

// 🔹 GET BOUTIQUES
export async function getBoutiques() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/boutiques/getAllBoutiques`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    console.log("API boutiques:", data);

    return data.boutiques || [];

  } catch (error) {
    console.error("Erreur boutiques:", error);
    return [];
  }
}

// 🔹 GET MANAGERS BY BOUTIQUE
export async function getManagersByBoutique(id_boutique) {
  try {
    const token = localStorage.getItem("token");

    if (!id_boutique) return [];

    const res = await fetch(
      `${BASE_URL}/managers/getManagersByBoutique/${id_boutique}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    console.log("API managers:", data);

    return data.managers || [];

  } catch (error) {
    console.error("Erreur managers:", error);
    return [];
  }
}

// 🔥 AJOUT EMPLOYÉ (VERSION CORRIGÉE)
export async function AjoutEmployeForm(form) {
  try {
    const token = localStorage.getItem("token");

    // 🔥 NORMALISATION DES TYPES (IMPORTANT)
    const payload = {
      Nom: form.Nom,
      Prenom: form.Prenom,
      Email: form.Email,
      Adresse: form.Adresse,
      Telephone: form.Telephone,
      Motdepasse: form.Motdepasse,
      ID_boutique: Number(form.ID_boutique),
      ID_role: Number(form.ID_role),
      ID_manager: Number(form.ID_manager)
    };

    const res = await fetch(`${BASE_URL}/employes/ajouteremploye`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    console.log("API employe response:", data);

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Erreur lors de l'ajout"
      };
    }

    return {
      success: true,
      message: "Employé ajouté avec succès ✅",
      data
    };

  } catch (error) {
    console.error("Erreur serveur:", error);
    return {
      success: false,
      message: "Erreur serveur"
    };
  }
}