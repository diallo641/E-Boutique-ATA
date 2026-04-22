const BASE_URL = "http://localhost:3000/api";

// 🔥 GET MANAGER BY ID
export async function getManagerById(id) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/managers/getManagerByID/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
      return null;
    }

    return data;

  } catch (error) {
    console.error("Erreur get manager:", error);
    return null;
  }
}

// 🔥 UPDATE MANAGER (version propre React)
export async function EditerManagerForm(id, form) {
  try {
    const token = localStorage.getItem("token");

    const {
      Nom,
      Prenom,
      Email,
      Telephone,
      Adresse,
      ID_boutique,
      ID_role
    } = form;

    // validation
    if (!Nom || !Prenom || !Email || !Telephone || !Adresse || !ID_boutique) {
      return {
        success: false,
        message: "Veuillez remplir tous les champs obligatoires"
      };
    }

    const response = await fetch(
      `${BASE_URL}/managers/updateManager/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          Nom,
          Prenom,
          Email,
          Telephone,
          Adresse,
          ID_boutique,
          ID_role: ID_role || 2
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Erreur modification manager"
      };
    }

    return {
      success: true,
      message: "Manager modifié avec succès ✅",
      data
    };

  } catch (error) {
    console.error("Erreur update manager:", error);

    return {
      success: false,
      message: "Erreur serveur"
    };
  }
}