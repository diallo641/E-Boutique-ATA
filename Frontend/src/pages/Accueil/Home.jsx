import { useState } from "react";
import { Link } from "react-router-dom";
import Headers from "../../composants/Headers";
import Footer from "../../composants/Pieds";
import AjouterAuPanier from "../../composants/AjouterPanier";

// Exemple de tableau de produits
const produits = [
  { id: 1, nom: "Produit 1", prix: 25000, img: "https://images.pexels.com/photos/8318201/pexels-photo-8318201.jpeg" },
  { id: 2, nom: "Produit 2", prix: 15000, img: "https://images.pexels.com/photos/17539592/pexels-photo-17539592.jpeg" },
  { id: 3, nom: "Produit 3", prix: 15000, img: "https://images.pexels.com/photos/10114295/pexels-photo-10114295.jpeg" },
  { id: 4, nom: "Produit 4", prix: 15000, img: "https://images.pexels.com/photos/17033702/pexels-photo-17033702.jpeg" },
  { id: 5, nom: "Casque Audio", prix: 20000, img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
  { id: 6, nom: "Ordinateur Portable", prix: 350000, img: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg" },
  { id: 7, nom: "Montre Connectée", prix: 45000, img: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg" },
  { id: 8, nom: "Chaussures Sport", prix: 30000, img: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg" },
];

// Exemple de témoignages
const avisClients = [
  { nom: "Awa S.", message: "Excellent service et livraison rapide !" },
  { nom: "Mamadou D.", message: "Produits de très bonne qualité. Je recommande." },
  { nom: "Fatou K.", message: "Boutique fiable, paiement sécurisé, très satisfait !" },
];

function Home() {
  const [recherche, setRecherche] = useState("");
  const [produitsFiltres, setProduitsFiltres] = useState(produits);

  // Filtrer les produits par recherche
  const Rechercher = (e) => {
    const valeur = e.target.value.toLowerCase();
    setRecherche(valeur);
    setProduitsFiltres(
      produits.filter((p) => p.nom.toLowerCase().includes(valeur))
    );
  };

  return (
    <div>
      <Headers />

      {/* Barre de recherche */}
      <section className="py-6 px-6 bg-blue-50 text-center">
        <input
          type="text"
          placeholder="Rechercher un produit sur notre boutique..."
          value={recherche}
          onChange={Rechercher}
          className="border px-4 py-2 rounded w-64 sm:w-96"
        />
      </section>

      {/* Slider / Carrousel promotions */}
      <section className="relative py-12 overflow-hidden">
        <div className="flex animate-scroll space-x-8">
          {produits.map((p) => (
            <div key={p.id} className="min-w-[300px] border rounded shadow">
              <img src={p.img} alt={p.nom} className="h-48 w-full object-cover"/>
              <div className="p-4 text-center font-bold">{p.nom}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Avantages */}
      <section className="py-12 px-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div><h3 className="text-xl font-bold mb-2">🚚 Livraison rapide</h3><p>Partout au Sénégal</p></div>
          <div><h3 className="text-xl font-bold mb-2">🔒 Paiement sécurisé</h3><p>Paiement 100% sécurisé</p></div>
          <div><h3 className="text-xl font-bold mb-2">⭐ Produits de qualité</h3><p>Les meilleurs produits</p></div>
        </div>
      </section>

      {/* Section Nouveautés / Meilleures ventes */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Nouveautés & Meilleures ventes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produitsFiltres.map((p) => (
            <Link to={`/produit/${p.id}`} key={p.id}>
              <div className="border rounded shadow p-4 hover:shadow-lg transition">
                <img src={p.img} alt={p.nom} className="w-full h-48 object-cover mb-4"/>
                <h3 className="font-bold text-lg mb-2">{p.nom}</h3>
                <p className="font-bold">{p.prix.toLocaleString()} CFA <AjouterAuPanier /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section Catégories */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link to="/categorie/electronique"><div className="bg-white rounded shadow overflow-hidden hover:shadow-lg"><img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg" className="h-32 w-full object-cover"/><div className="p-4 text-center font-bold">Électronique</div></div></Link>
          <Link to="/categorie/mode"><div className="bg-white rounded shadow overflow-hidden hover:shadow-lg"><img src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" className="h-32 w-full object-cover"/><div className="p-4 text-center font-bold">Mode</div></div></Link>
          <Link to="/categorie/maison"><div className="bg-white rounded shadow overflow-hidden hover:shadow-lg"><img src="https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg" className="h-32 w-full object-cover"/><div className="p-4 text-center font-bold">Maison</div></div></Link>
          <Link to="/categorie/sport"><div className="bg-white rounded shadow overflow-hidden hover:shadow-lg"><img src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg" className="h-32 w-full object-cover"/><div className="p-4 text-center font-bold">Sport</div></div></Link>
        </div>
      </section>

      {/* Section témoignages / avis clients */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Ce que disent nos clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {avisClients.map((avis, idx) => (
            <div key={idx} className="border rounded p-6 shadow hover:shadow-lg transition">
              <p className="italic mb-2">"{avis.message}"</p>
              <h4 className="font-bold">{avis.nom}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-blue-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Recevez nos promotions</h2>
        <p className="text-gray-700 mb-6">Inscrivez-vous pour recevoir nos offres exclusives.</p>
        <div className="flex justify-center gap-2">
          <input type="email" placeholder="Votre email" className="border px-4 py-2 rounded w-64 sm:w-96"/>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">S'inscrire</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;