const BASE_URL = "http://localhost:3000/api";

// FETCH GENERIQUE
const fetchData = async (url, options = {}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur API");
    }

    return data;

  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
};

// =======================
// DELETE STOCK
// =======================
export const deleteStock = async (ID_produit, ID_boutique) => {
  return await fetchData(
    `${BASE_URL}/stocks/deletestock/${ID_produit}/${ID_boutique}`,
    {
      method: "DELETE",
    }
  );
};