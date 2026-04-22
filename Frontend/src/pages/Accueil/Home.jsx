import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Headers from "../../composants/Headers";
import Footer from "../../composants/Pieds";
import AjouterAuPanier from "../../composants/AjouterPanier";

function Home() {

  const [produits, setProduits] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 Charger produits depuis backend
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/produits/getAllProduits", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();
        setProduits(data.Produits || []);

      } catch (error) {
        console.error("Erreur chargement produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  // 🔍 filtre recherche
  const produitsFiltres = produits.filter((p) =>
    p.Nom_produit?.toLowerCase().includes(recherche.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-center">Chargement des produits...</div>;
  }

  return (
    <div>
      <Headers />

      {/* SEARCH */}
      <section className="py-6 px-6 bg-blue-50 text-center">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="border px-4 py-2 rounded w-64 sm:w-96"
        />
      </section>

      {/* PRODUITS */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Produits disponibles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {produitsFiltres.map((p) => (
            <div key={p.ID_produit} className="border rounded shadow p-4 hover:shadow-lg transition">

              <img
                src="https://images.pexels.com/photos/8318201/pexels-photo-8318201.jpeg"
                alt={p.Nom_produit}
                className="w-full h-48 object-cover mb-4"
              />

              <h3 className="font-bold text-lg mb-2">
                {p.Nom_produit}
              </h3>

              <p className="mb-2 font-bold">
                {Number(p.Prix).toLocaleString()} FCFA
              </p>

              {/* 🔥 IMPORTANT: on passe le produit */}
              <AjouterAuPanier
                produit={{
                  id: p.ID_produit,
                  nom: p.Nom_produit,
                  prix: p.Prix,
                  image: "https://images.pexels.com/photos/8318201/pexels-photo-8318201.jpeg"
                }}
              />

            </div>
          ))}

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;