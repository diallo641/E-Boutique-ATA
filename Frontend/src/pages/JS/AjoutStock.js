const BASE_URL = "http://localhost:3000/api";

// =======================
// FETCH GENERIQUE
// =======================
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
// AJOUT STOCK
// =======================
export const ajouterStock = async (stock) => {
  return await fetchData(`${BASE_URL}/stocks/ajouterstock`, {
    method: "POST",
    body: JSON.stringify({
      ID_produit: Number(stock.ID_produit),
      ID_boutique: Number(stock.ID_boutique),
      Quantite: Number(stock.Quantite)
    }),
  });
};

// =======================
// PRODUITS (SELECT)
// =======================
export const getProduits = async () => {
  const data = await fetchData(`${BASE_URL}/produits/getAllProduits`);
  return data?.Produits || [];
};

// =======================
// BOUTIQUES (SELECT)
// =======================
export const getBoutiques = async () => {
  const data = await fetchData(`${BASE_URL}/boutiques/getAllBoutiques`);
  return data?.boutiques || [];
};