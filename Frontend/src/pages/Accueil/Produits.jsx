import { Link } from "react-router-dom";
import Headers from "../../composants/Headers";
import Footer from "../../composants/Pieds";
import AjouterAuPanier from "../../composants/AjouterPanier";

function ProduitDetail() {
  // Produit statique pour l'affichage
  const produit = {
    nom: "Casque Audio Premium",
    prix: 20000,
    imgs: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      "https://images.pexels.com/photos/8318201/pexels-photo-8318201.jpeg"
    ],
    description: "Casque audio haute qualité avec son clair et confortable pour toutes vos sessions d’écoute.",
    avis: [
      { nom: "Awa S.", message: "Super produit !" },
      { nom: "Mamadou D.", message: "Très satisfait de mon achat." }
    ],
    similaires: [
      { id: 2, nom: "Produit 1", prix: 25000, img: "https://images.pexels.com/photos/8318201/pexels-photo-8318201.jpeg" },
      { id: 3, nom: "Produit 2", prix: 15000, img: "https://images.pexels.com/photos/17539592/pexels-photo-17539592.jpeg" },
      { id: 4, nom: "Produit 3", prix: 15000, img: "https://images.pexels.com/photos/10114295/pexels-photo-10114295.jpeg" },
      { id: 5, nom: "Produit 4", prix: 15000, img: "https://images.pexels.com/photos/17033702/pexels-photo-17033702.jpeg" },
    ]
  };

  return (
    <div>
      <Headers />

      {/* Section produit */}
      <section className="py-16 px-6">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Galerie images */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <img src={produit.imgs[0]} alt={produit.nom} className="w-full h-auto rounded shadow"/>
            <div className="flex gap-4 mt-2">
              {produit.imgs.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${produit.nom} ${idx}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border hover:border-blue-500"
                />
              ))}
            </div>
          </div>

          {/* Infos produit */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{produit.nom}</h1>
            <p className="text-xl text-red-600 font-bold">{produit.prix.toLocaleString()} CFA</p>
            <p className="text-gray-700">{produit.description}</p>

            <div className="flex items-center gap-4 mt-4">
              <span>Quantité :</span>
              <div className="flex items-center border rounded">
                <button className="px-3 py-1">−</button>
                <input type="number" value={1} readOnly className="w-12 text-center"/>
                <button className="px-3 py-1">+</button>
              </div>
            </div>

            <div className="mt-4">
              <AjouterAuPanier produit={{ ...produit, quantite: 1 }} />
            </div>
          </div>

        </div>
      </section>

      {/* Produits similaires */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {produit.similaires.map(p => (
            <Link to={`/produit/${p.id}`} key={p.id}>
              <div className="border rounded shadow p-4 hover:shadow-lg transition">
                <img src={p.img} alt={p.nom} className="w-full h-48 object-cover mb-2"/>
                <h3 className="font-bold">{p.nom}</h3>
                <p className="font-bold">{p.prix.toLocaleString()} CFA</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Avis clients */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-2xl font-bold mb-6">Avis clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {produit.avis.map((avis, idx) => (
            <div key={idx} className="border rounded p-4 shadow hover:shadow-lg transition">
              <p className="italic mb-2">"{avis.message}"</p>
              <h4 className="font-bold">{avis.nom}</h4>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProduitDetail;