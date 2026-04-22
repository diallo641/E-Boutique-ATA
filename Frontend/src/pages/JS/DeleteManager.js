const BASE_URL = "http://localhost:3000/api";

// 🔥 DELETE MANAGER
export async function deleteManager(id) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/managers/deleteManager/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Erreur suppression manager"
      };
    }

    return {
      success: true,
      message: data.message
    };

  } catch (error) {
    console.error("Erreur delete manager:", error);

    return {
      success: false,
      message: "Erreur serveur"
    };
  }
}