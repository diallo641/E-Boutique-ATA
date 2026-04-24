import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deconnexion } from "../JS/deconnexion";
import AjouterAuPanier from "../../composants/AjouterPanier";



function ProduitsClient() {

  const [boutique, setBoutique] = useState("");
  const [produits, setProduits] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [loading, setLoading] = useState(false);

  const mappingBoutiques = {
    "Dakar - Grand Dakar - Sham": 1,
    "Dakar - Plateau": 2,
    "Dakar - Parcelles": 3
  };

  const chargerProduits = async (idBoutique) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/stocks/stockboutique/${idBoutique}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const data = await res.json();
      const stocks = data.Stocks || [];

      // 🔥 FILTRE STOCK > 0
      const stocksDisponibles = stocks.filter(
        (s) => Number(s.Quantite) > 0
      );

      const produitsTransformes = stocksDisponibles.map((s) => ({
        ID_produit: s.ID_produit,
        Nom_produit: s.Nom_produit,
        Prix: Number(s.Prix),
        Quantite: Number(s.Quantite)
      }));

      setProduits(produitsTransformes);

    } catch (err) {
      console.error("Erreur chargement:", err);
      setProduits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (boutique) {
      chargerProduits(mappingBoutiques[boutique]);
    } else {
      setProduits([]);
    }
  }, [boutique]);

  const produitsFiltres = produits.filter((p) =>
    (p.Nom_produit ?? "")
      .toLowerCase()
      .includes((recherche ?? "").toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* 🔥 HEADER RESPONSIVE */}
      <header className="bg-white shadow p-4 flex justify-between items-center mb-6">

        <h1 className="text-lg md:text-xl font-bold">🛍️ Ma Boutique</h1>

        {/* Desktop */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/client/produits" className="text-blue-500">Produits</Link>
          <Link to="/Panier" className="text-blue-500">Panier</Link> 
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Déconnexion desktop */}
        <button
          onClick={deconnexion}
          className="hidden md:block px-3 py-1 bg-red-500 text-white rounded"
        >
          Déconnexion
        </button>
      </header>
   


      <h1 className="text-2xl font-bold mb-4 text-center">
        🛒 Produits par boutique
      </h1>

      {/* BOUTIQUE */}
      <select
        className="border p-2 mb-4 w-full md:w-1/2 mx-auto rounded shadow center block"
        value={boutique}
        onChange={(e) => setBoutique(e.target.value)}
      >
        <option value="">-- Choisir une boutique --</option>
        <option value="Dakar - Grand Dakar - Sham">Dakar - Grand Dakar - Sham</option>
        <option value="Dakar - Plateau">Dakar - Plateau</option>
        <option value="Dakar - Parcelles">Dakar - Parcelles</option>
      </select>

     

      {/* ETATS */}
      {!boutique ? (
        <p className="text-center">Veuillez choisir une boutique</p>
      ) : loading ? (
        <p className="text-center">Chargement...</p>
      ) : produitsFiltres.length === 0 ? (
        <p className="text-center">Aucun produit disponible</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {produitsFiltres.map((p) => (
            <div key={p.ID_produit} className="bg-white p-3 rounded shadow">

              <h3 className="font-bold">{p.Nom_produit}</h3>

              <p>{p.Prix.toLocaleString()} FCFA</p>

              <p className="text-sm text-gray-500">
                Stock : {p.Quantite}
              </p>

              <AjouterAuPanier
                produit={{
                  id: p.ID_produit,
                  nom: p.Nom_produit,
                  prix: p.Prix,
                  image: "https://images.pexels.com/photos/8318201/pexels-photo-8318201.jpeg",
                  ID_boutique: mappingBoutiques[boutique],
                  quantiteStock: p.Quantite // 🔥 important
                }}
              />

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default ProduitsClient;