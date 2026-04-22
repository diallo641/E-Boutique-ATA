const BASE_URL = "http://localhost:3000/api";

// 🔹 GET EMPLOYÉ BY ID (pré-remplissage)
export async function getEmployeById(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/employes/getEmployeByID/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) return null;

    return data.employe;

  } catch (error) {
    console.error("Erreur get employé:", error);
    return null;
  }
}

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
    return data.boutiques || [];

  } catch (error) {
    console.error(error);
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
    return data.managers || [];

  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 UPDATE EMPLOYÉ
export async function updateEmploye(id, form) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/employes/updateEmploye/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        ID_boutique: Number(form.ID_boutique),
        ID_manager: Number(form.ID_manager),
        ID_role: Number(form.ID_role)
      })
    });

    const data = await res.json();

    return {
      success: res.ok,
      message: data.message,
      data
    };

  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erreur serveur"
    };
  }
}