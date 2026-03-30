import { useState } from "react";
import { addToCart } from "/src/pages/JS/Panier"

function AjouterAuPanier({ produit }) {
  return (
    <div className="mt-4">
      {/* Input quantité + bouton */}
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="number"
          min={1}
          defaultValue={1}
          className="w-16 border border-gray-300 rounded px-2 py-1"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Ajouter au panier
        </button>
      </div>

      {/* Message (UI seulement, caché) */}
      <div className="text-green-600 text-sm hidden">
        Produit ajouté au panier !
      </div>
    </div>
  );
}

export default AjouterAuPanier;