import { useState } from "react";
import { addToCart } from "/src/pages/JS/Panier"

function AjouterAuPanier({ produit }) {
  const [quantity, setQuantity] = useState(0); // état pour la quantité
  const [message, setMessage] = useState("");  // état pour le message de confirmation

  // Fonction appelée au clic sur le bouton "Ajouter au panier"
  const handleAdd = () => {
    addToCart(produit, quantity); // appel de la fonction du fichier JS
    setMessage(`${produit.nom} a été ajouté au panier !`); // message utilisateur
    setQuantity(1); // réinitialiser la quantité

    // Effacer le message après 2 secondes
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="mt-4">
      {/* Input quantité + bouton */}
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-16 border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Ajouter au panier
        </button>
      </div>

      {/* Message de confirmation */}
      {message && <div className="text-green-600 text-sm">{message}</div>}
    </div>
  );
}

export default AjouterAuPanier;