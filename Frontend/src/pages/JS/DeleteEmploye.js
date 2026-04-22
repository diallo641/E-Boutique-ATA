const BASE_URL = "http://localhost:3000/api";

// 🔥 DELETE EMPLOYÉ
export async function deleteEmploye(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/employes/deleteEmploye/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Erreur suppression"
      };
    }

    return {
      success: true,
      message: data.message
    };

  } catch (error) {
    console.error("Erreur delete employe:", error);
    return {
      success: false,
      message: "Erreur serveur"
    };
  }
}