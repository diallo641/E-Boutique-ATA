import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  obtenirPanier,
  supprimerDuPanier,
  viderPanier,
  calculerTotalPanier,
  modifierQuantite
} from "/src/pages/JS/Panier";

function Panier() {

  const [panier, setPanier] = useState([]);
  const navigate = useNavigate(); // ✅ FIX IMPORTANT

  // 🔹 charger panier
  useEffect(() => {
    setPanier(obtenirPanier());
  }, []);

  const rafraichirPanier = () => {
    setPanier(obtenirPanier());
  };

  const supprimerProduit = (id) => {
    supprimerDuPanier(id);
    rafraichirPanier();
  };

  const viderTout = () => {
    viderPanier();
    setPanier([]);
  };

  const augmenterQuantite = (id) => {
    modifierQuantite(id, 1);
    rafraichirPanier();
  };

  const diminuerQuantite = (id) => {
    modifierQuantite(id, -1);
    rafraichirPanier();
  };

  // =========================
  // 🔥 VALIDATION COMMANDE
  // =========================
  const validerPanier = async () => {
    try {

      const panierData = obtenirPanier();
      const total = calculerTotalPanier();

      // 🔥 1. CREATION COMMANDE
      const response = await fetch("http://localhost:3000/api/commandes/ajoutercommande", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          Total: total,
          Mode_paiement: "CASH",
          ID_boutique: 1
        })
      });

      const data = await response.json();
      console.log("COMMANDE RESPONSE:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const ID_commande = data?.Commande?.ID_commande;

      if (!ID_commande) {
        alert("Erreur: ID commande introuvable");
        return;
      }

      // 🔥 2. DETAILS COMMANDE
      for (let item of panierData) {

        const resDetail = await fetch("http://localhost:3000/api/details/ajouterdetail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            ID_commande,
            ID_produit: item.id,
            Prix: item.prix,
            Quantite: item.quantite, // ✅ FIX ICI
            ID_boutique: 1
          })
        });

        const detailData = await resDetail.json();

        if (!resDetail.ok) {
          console.error("Erreur detail:", detailData);
        }
      }

      // 🔥 3. SUCCESS
      viderPanier();
      setPanier([]);

      navigate("/commande_success");

    } catch (error) {
      console.error("Erreur commande:", error);
      alert("Erreur lors de la commande");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        🛒 Mon Panier
      </h1>

      {panier.length === 0 ? (
        <p className="text-center text-gray-600">
          Votre panier est vide 😔
        </p>
      ) : (
        <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 rounded shadow">

          <div className="overflow-x-auto">

            <table className="min-w-full border">

              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Produit</th>
                  <th className="p-3">Prix</th>
                  <th className="p-3">Quantité</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>

                {panier.map((produit) => (
                  <tr key={produit.id} className="border-b text-center">

                    <td className="p-3 text-left flex items-center gap-3">
                      <img
                        src={produit.image}
                        alt={produit.nom}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="font-semibold">{produit.nom}</span>
                    </td>

                    <td className="p-3">
                      {produit.prix.toLocaleString()} FCFA
                    </td>

                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">

                        <button onClick={() => diminuerQuantite(produit.id)}>
                          -
                        </button>

                        <span className="font-bold">{produit.quantite}</span>

                        <button onClick={() => augmenterQuantite(produit.id)}>
                          +
                        </button>

                      </div>
                    </td>

                    <td className="p-3 font-bold text-green-600">
                      {(produit.prix * produit.quantite).toLocaleString()} FCFA
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => supprimerProduit(produit.id)}
                        className="text-red-500 hover:underline"
                      >
                        Supprimer
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="text-right mt-6 text-xl font-bold">
            Total : {calculerTotalPanier().toLocaleString()} FCFA
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">

            <button
              onClick={viderTout}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Vider le panier
            </button>

            <button
              onClick={validerPanier}
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Valider la commande
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Panier;