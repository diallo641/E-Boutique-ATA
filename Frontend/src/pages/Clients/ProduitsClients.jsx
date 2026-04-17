import { useState } from "react";
import AjouterAuPanier from "../../composants/AjouterPanier";

// 📦 liste des produits
const listeDesProduits = [
  { id: 1, nom: "Produit 1", prix: 25000, image: "https://images.pexels.com/photos/8318201/pexels-photo-8318201.jpeg" },
  { id: 2, nom: "Produit 2", prix: 15000, image: "https://images.pexels.com/photos/17539592/pexels-photo-17539592.jpeg" },
  { id: 3, nom: "Casque Audio", prix: 20000, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
  { id: 4, nom: "Ordinateur Portable", prix: 350000, image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg" },
  { id: 5, nom: "Montre Connectée", prix: 45000, image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg" }
];

function ProduitsClient() {

  const [termeRecherche, setTermeRecherche] = useState("");
  const [produitsAffiches, setProduitsAffiches] = useState(listeDesProduits);

  // 🔍 rechercher produits
  const rechercherProduits = (e) => {
    const valeur = e.target.value.toLowerCase();
    setTermeRecherche(valeur);

    const resultat = listeDesProduits.filter((produit) =>
      produit.nom.toLowerCase().includes(valeur)
    );

    setProduitsAffiches(resultat);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* TITRE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        🛒 Nos Produits
      </h1>

      {/* BARRE DE RECHERCHE */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={termeRecherche}
        onChange={rechercherProduits}
        className="w-full md:w-1/2 p-2 border rounded mb-6"
      />

      {/* LISTE PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {produitsAffiches.map((produit) => (
          <div
            key={produit.id}
            className="bg-white rounded shadow hover:shadow-lg transition p-3"
          >

            {/* IMAGE */}
            <img
              src={produit.image}
              alt={produit.nom}
              className="w-full h-48 object-cover rounded"
            />

            {/* INFOS */}
            <h2 className="font-bold mt-3">{produit.nom}</h2>

            <p className="text-gray-600">
              {produit.prix.toLocaleString()} FCFA
            </p>

            {/* BOUTON AJOUT PANIER */}
            <AjouterAuPanier
              produit={{
                id: produit.id,
                nom: produit.nom,
                prix: produit.prix,
                image: produit.image
              }}
            />

          </div>
        ))}

      </div>
    </div>
  );
}

export default ProduitsClient;