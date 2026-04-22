export function obtenirPanier() {
  return JSON.parse(localStorage.getItem("panier")) || [];
}

function sauvegarderPanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

// =========================
// AJOUT PANIER (FIX BOUTIQUE)
// =========================
export function ajouterAuPanier(produit, quantite = 1) {
  let panier = obtenirPanier();

  const index = panier.findIndex(item => item.id === produit.id);

  const itemNormalise = {
    id: produit.id,
    nom: produit.nom,
    prix: Number(produit.prix), // 🔥 IMPORTANT: conversion number
    image: produit.image,
    quantite: Number(quantite),

    // 🔥 IMPORTANT: AJOUT BOUTIQUE
    ID_boutique: produit.ID_boutique
  };

  if (index !== -1) {
    panier[index].quantite += Number(quantite);
  } else {
    panier.push(itemNormalise);
  }

  sauvegarderPanier(panier);
}

export function supprimerDuPanier(id) {
  let panier = obtenirPanier();
  panier = panier.filter(item => item.id !== id);
  sauvegarderPanier(panier);
}

export function viderPanier() {
  localStorage.removeItem("panier");
}

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

export function calculerTotalPanier() {
  const panier = obtenirPanier();

  return panier.reduce(
    (total, item) => total + Number(item.prix) * Number(item.quantite),
    0
  );
}

export function compterArticlesPanier() {
  const panier = obtenirPanier();

  return panier.reduce(
    (total, item) => total + Number(item.quantite),
    0
  );
}