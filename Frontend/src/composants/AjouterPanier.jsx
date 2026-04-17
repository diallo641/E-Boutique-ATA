import { useState } from "react";
import { ajouterAuPanier } from "/src/pages/JS/Panier";

function AjouterAuPanier({ produit }) {

  const [quantite, setQuantite] = useState(1);
  const [confirmation, setConfirmation] = useState(false);

  const ajouter = () => {
    ajouterAuPanier(produit, Number(quantite));

    setConfirmation(true);

    setTimeout(() => {
      setConfirmation(false);
    }, 2000);
  };

  return (
    <div className="mt-4">

      {/* QUANTITÉ + BOUTON */}
      <div className="flex items-center space-x-2">

        <input
          type="number"
          min={1}
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
          className="w-16 border rounded px-2 py-1"
        />

        <button
          onClick={ajouter}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>

      </div>

      {/* MESSAGE CONFIRMATION */}
      {confirmation && (
        <p className="text-green-600 text-sm mt-1">
          Produit ajouté au panier ✔️
        </p>
      )}

    </div>
  );
}

export default AjouterAuPanier;