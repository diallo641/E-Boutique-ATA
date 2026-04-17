
import React from "react";
function AjouterCommandeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Ajouter Commande
    </button>
  );
}

export default AjouterCommandeButton;