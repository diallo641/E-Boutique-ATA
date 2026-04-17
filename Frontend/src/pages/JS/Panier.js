// ==============================
// 🛒 GESTION DU PANIER (LOCALSTORAGE)
// ==============================

// 🔹 récupérer le panier
export function obtenirPanier() {
  return JSON.parse(localStorage.getItem("panier")) || [];
}

// 🔹 sauvegarder le panier
function sauvegarderPanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

// 🔹 ajouter un produit au panier
export function ajouterAuPanier(produit, quantite = 1) {
  let panier = obtenirPanier();

  const index = panier.findIndex(item => item.id === produit.id);

  if (index !== -1) {
    panier[index].quantite += quantite;
  } else {
    panier.push({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      image: produit.image,
      quantite
    });
  }

  sauvegarderPanier(panier);
}

// 🔹 supprimer un produit
export function supprimerDuPanier(id) {
  let panier = obtenirPanier();
  panier = panier.filter(item => item.id !== id);
  sauvegarderPanier(panier);
}

// 🔹 vider panier
export function viderPanier() {
  localStorage.removeItem("panier");
}

// 🔹 modifier quantité
export function modifierQuantite(id, changement) {
  let panier = obtenirPanier();

  const index = panier.findIndex(item => item.id === id);

  if (index !== -1) {
    panier[index].quantite += changement;

    if (panier[index].quantite <= 0) {
      panier.splice(index, 1);
    }
  }

  sauvegarderPanier(panier);
}

// 🔹 total panier
export function calculerTotalPanier() {
  const panier = obtenirPanier();

  return panier.reduce(
    (total, item) => total + item.prix * item.quantite,
    0
  );
}

// 🔹 compteur badge
export function compterArticlesPanier() {
  const panier = obtenirPanier();

  return panier.reduce(
    (total, item) => total + item.quantite,
    0
  );
}

// ==============================
// 🔥 VALIDATION COMMANDE BACKEND
// ==============================

export async function validerCommandeBackend({
  panier,
  token,
  ID_client,
  ID_boutique,
  ID_employe,
  modePaiement = "CASH"
}) {

  if (!token) {
    throw new Error("Utilisateur non connecté");
  }

  // 🔹 calcul total basé sur le panier passé
  const total = panier.reduce(
    (sum, item) => sum + item.prix * item.quantite,
    0
  );

  // 1️⃣ créer commande
  const response = await fetch("http://localhost:3000/api/commandes/ajoutercommande", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      Total: total,
      Mode_paiement: modePaiement,
      ID_client,
      ID_employe,
      ID_boutique
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const ID_commande = data.Commande.ID_commande;

  // 2️⃣ ajouter détails commande
  for (let item of panier) {
    await fetch("http://localhost:3000/api/details/ajouterdetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        ID_commande,
        ID_produit: item.id,
        Prix: item.prix,
        Quantite: item.quantite,
        ID_boutique
      })
    });
  }

  // 3️⃣ vider panier
  viderPanier();

  return {
    success: true,
    ID_commande
  };
}