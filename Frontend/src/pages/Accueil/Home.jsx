import Headers from "../../composants/Headers";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Header */}
      <Headers />
      {/* Bannière promotionnelle */}
      <section className="bg-blue-200 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre boutique !</h1>
        <p className="text-lg text-gray-700 mb-6">
          Découvrez nos produits exclusifs et promotions du moment.
        </p>
        <Link
          to="/produits"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 inline-block"
        >
          Voir les produits
        </Link>
        
      </section>

      {/* Produits populaires */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Produits populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Exemple produit */}
          <div className="border rounded shadow p-4 hover:shadow-lg transition">
            <img src="https://images.pexels.com/photos/8318201/pexels-photo-8318201.jpeg" alt="Produit 1" className="w-full h-48 object-cover mb-4" />
            <h3 className="font-bold text-lg mb-2">Produit 1</h3>
            <p className="text-gray-600 mb-2">Description courte du produit.</p>
            <p className="font-bold">25 000 CFA</p>
          </div>

          <div className="border rounded shadow p-4 hover:shadow-lg transition">
            <img src="https://images.pexels.com/photos/17539592/pexels-photo-17539592.jpeg" alt="Produit 2" className="w-full h-48 object-cover mb-4" />
            <h3 className="font-bold text-lg mb-2">Produit 2</h3>
            <p className="text-gray-600 mb-2">Description courte du produit.</p>
            <p className="font-bold">15 000 CFA</p>
          </div>

          <div className="border rounded shadow p-4 hover:shadow-lg transition">
            <img src="https://images.pexels.com/photos/10114295/pexels-photo-10114295.jpeg" alt="Produit 3" className="w-full h-48 object-cover mb-4" />
            <h3 className="font-bold text-lg mb-2">Produit 3</h3>
            <p className="text-gray-600 mb-2">Description courte du produit.</p>
            <p className="font-bold">15 000 CFA</p>
          </div>

          <div className="border rounded shadow p-4 hover:shadow-lg transition">
            <img src="https://images.pexels.com/photos/17033702/pexels-photo-17033702.jpeg" alt="Produit 4" className="w-full h-48 object-cover mb-4" />
            <h3 className="font-bold text-lg mb-2">Produit 4</h3>
            <p className="text-gray-600 mb-2">Description courte du produit.</p>
            <p className="font-bold">15 000 CFA</p>
          </div>

          {/* Ajoute autant de produits que tu veux */}
        </div>
      </section>

      {/* Catégories ou autres sections */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded shadow p-4 text-center hover:shadow-lg transition hover:bg-blue-100">Catégorie 1</div>
          <div className="bg-white rounded shadow p-4 text-center hover:shadow-lg transition">Catégorie 2</div>
          <div className="bg-white rounded shadow p-4 text-center hover:shadow-lg transition">Catégorie 3</div>
          <div className="bg-white rounded shadow p-4 text-center hover:shadow-lg transition">Catégorie 4</div>
        </div>
      </section>
    </div>
  );
}

export default Home;