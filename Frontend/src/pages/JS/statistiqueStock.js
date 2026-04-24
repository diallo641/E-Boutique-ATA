const BASE_URL = "http://localhost:3000/api";

// =======================
// FETCH GLOBAL
// =======================
const fetchData = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur API");
  }

  return data;
};

// =======================
// GET STOCKS
// =======================
export const getStocks = async () => {
  const data = await fetchData(`${BASE_URL}/stocks/getAllStocks`);
  return data?.Stocks || [];
};

// =======================
// DELETE STOCK
// =======================
export const deleteStock = async (stock) => {
  return await fetchData(
    `${BASE_URL}/stocks/deletestock/${stock.ID_produit}/${stock.ID_boutique}`,
    { method: "DELETE" }
  );
};

// =======================
// UPDATE STOCK
// =======================
export const updateStock = async (stock, qty) => {
  return await fetchData(
    `${BASE_URL}/stocks/modifierstock/${stock.ID_produit}/${stock.ID_boutique}`,
    {
      method: "PUT",
      body: JSON.stringify({ Quantite: qty })
    }
  );
};

// =======================
// EVENTS (UI ↔ LOGIC)
// =======================

// Voir
window.addEventListener("voirStock", (e) => {
  const s = e.detail;

  alert(
    `📦 Produit: ${s.Nom_produit || s.ID_produit}
🏪 Boutique: ${s.ID_boutique}
📊 Quantité: ${s.Quantite}`
  );
});

// Modifier
window.addEventListener("modifierStock", async (e) => {
  const s = e.detail;

  const newQty = prompt("Nouvelle quantité :", s.Quantite);
  if (!newQty) return;

  await updateStock(s, Number(newQty));

  alert("Stock mis à jour (refresh page pour voir changement)");
});

// Supprimer
window.addEventListener("supprimerStock", async (e) => {
  const s = e.detail;

  if (!window.confirm("Supprimer ce stock ?")) return;

  await deleteStock(s);

  alert("Stock supprimé (refresh page pour voir changement)");
});