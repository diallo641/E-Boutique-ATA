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
  const navigate = useNavigate();

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
  // VALIDATION COMMANDE
  // =========================
  const validerPanier = async () => {
    try {

      const panierData = obtenirPanier();

      if (!panierData || panierData.length === 0) {
        alert("Panier vide");
        return;
      }

      const total = Number(calculerTotalPanier());

      if (total <= 0) {
        alert("Total invalide");
        return;
      }

      const ID_boutique = Number(panierData[0]?.ID_boutique);

      if (!ID_boutique) {
        alert("Boutique introuvable");
        return;
      }

      // =========================
      // 1. CREER COMMANDE
      // =========================
      const resCommande = await fetch(
        "http://localhost:3000/api/commandes/ajoutercommande",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            Total: total,
            Mode_paiement: "CASH",
            ID_boutique
          })
        }
      );

      const dataCommande = await resCommande.json();
      console.log("TOKEN:", localStorage.getItem("token"));

      console.log("COMMANDE RESPONSE:", dataCommande);

      if (!resCommande.ok) {
        alert(dataCommande.message || "Erreur création commande");
        return;
      }

      const ID_commande = dataCommande?.Commande?.ID_commande;

      if (!ID_commande) {
        alert("Erreur: ID commande introuvable");
        return;
      }

      // =========================
      // 2. DETAILS COMMANDE
      // =========================
      for (const item of panierData) {

        const resDetail = await fetch(
          "http://localhost:3000/api/details/ajouterdetail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
              ID_commande,
              ID_produit: item.id,
              Prix: Number(item.prix),
              Quantite: Number(item.quantite)
            })
          }
        );

        const dataDetail = await resDetail.json();

        console.log("DETAIL RESPONSE:", dataDetail);

        if (!resDetail.ok) {
          alert(dataDetail.message || "Erreur stock / détail commande");

          // ⚠️ stop immédiat si erreur stock
          return;
        }
      }

      // =========================
      // SUCCESS
      // =========================
      viderPanier();
      setPanier([]);
      navigate("/commande_success");

    } catch (error) {
      console.error("Erreur validation panier:", error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <h1 className="text-2xl font-bold text-center mb-6">
        🛒 Mon Panier
      </h1>

      {panier.length === 0 ? (
        <p className="text-center">Panier vide</p>
      ) : (
        <div className="bg-white p-4 rounded shadow max-w-5xl mx-auto">

          <table className="w-full border">

            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Qté</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {panier.map((p) => (
                <tr key={p.id} className="text-center border-b">

                  <td className="flex items-center gap-2 p-2">
                    <img src={p.image} className="w-10 h-10 rounded" />
                    {p.nom}
                  </td>

                  <td>{Number(p.prix).toLocaleString()} FCFA</td>

                  <td>
                    <button onClick={() => diminuerQuantite(p.id)}>-</button>
                    <span className="mx-2">{p.quantite}</span>
                    <button onClick={() => augmenterQuantite(p.id)}>+</button>
                  </td>

                  <td>
                    {(Number(p.prix) * Number(p.quantite)).toLocaleString()} FCFA
                  </td>

                  <td>
                    <button
                      onClick={() => supprimerProduit(p.id)}
                      className="text-red-500"
                    >
                      Supprimer
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          <div className="text-right mt-4 font-bold">
            Total : {calculerTotalPanier().toLocaleString()} FCFA
          </div>

          <div className="flex justify-end gap-3 mt-4">

            <button
              onClick={viderTout}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Vider
            </button>

            <button
              onClick={validerPanier}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Valider commande
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Panier;