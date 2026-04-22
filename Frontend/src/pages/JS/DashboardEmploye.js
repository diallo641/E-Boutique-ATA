const BASE_URL = "http://localhost:3000/api";

/**
 * 🔥 Récupère le dashboard complet de l'employé connecté
 */
export async function getDashboardEmploye() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return {
        success: false,
        message: "Token manquant",
        data: null
      };
    }

    const res = await fetch(`${BASE_URL}/employes/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    // ❌ gestion erreur backend
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Erreur serveur",
        data: null
      };
    }

    return {
      success: true,
      message: data.message,
      data: {
        employe: data.employe,
        boutique: data.boutique,
        produits: data.produits || [],
        stock: data.stock || [],
        commandes: data.commandes || [],
        clients: data.clients || []
      }
    };

  } catch (error) {
    console.error("Erreur dashboard employé:", error);

    return {
      success: false,
      message: "Erreur réseau ou serveur",
      data: null
    };
  }
}