import { Link } from "react-router-dom";
import { deconnexion } from "../JS/deconnexion";
import { useEffect, useState } from "react";
import { getProduits, getStockByProduit, formatDateFR } from "../JS/statistiqueproduits";

function ProduitsAdmin() {

  const [produits, setProduits] = useState([]);
  const [stockMap, setStockMap] = useState({});

  // =======================
  // CHARGER PRODUITS
  // =======================
  useEffect(() => {
    const loadProduits = async () => {
      const data = await getProduits();
      setProduits(data || []);
    };

    loadProduits();
  }, []);

  // =======================
  // CHARGER STOCKS
  // =======================
  useEffect(() => {
    const loadStocks = async () => {
      const map = {};

      for (const prod of produits) {
        const stocks = await getStockByProduit(prod.ID_produit);

        map[prod.ID_produit] = stocks.reduce(
          (sum, s) => sum + s.Quantite,
          0
        );
      }

      setStockMap(map);
    };

    if (produits.length > 0) {
      loadStocks();
    }
  }, [produits]);

  // =======================
  // GET STOCK SIMPLE
  // =======================
  const getStock = (id) => {
    return stockMap[id] || 0;
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-white shadow p-4 flex flex-col md:flex-row md:justify-between md:items-center">

        <h1 className="text-xl font-bold mb-4 md:mb-0">
          Dashboard Produits
        </h1>

        <nav className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">

          <Link to="/Manager" className="text-blue-500 hover:underline">Manager</Link>
          <Link to="/employes" className="text-blue-500 hover:underline">Employés</Link>
          <Link to="/Clients" className="text-blue-500 hover:underline">Clients</Link>
          <Link to="/Comptes" className="text-blue-500 hover:underline">Comptes</Link>
          <Link to="/Categories" className="text-blue-500 hover:underline">Catégories</Link>
          <Link to="/Produits" className="text-blue-500 hover:underline">Produits</Link>
          <Link to="/commandes" className="text-blue-500 hover:underline">Commandes</Link>

          <button
            onClick={deconnexion}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Déconnexion
          </button>

        </nav>
      </header>

      {/* TOP */}
      <section className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="w-full md:w-1/3 px-4 py-2 border rounded"
        />

        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          + Ajouter un produit
        </button>

      </section>

      {/* TABLE */}
      <section className="px-6 pb-6">

        <div className="overflow-x-auto bg-white rounded shadow">

          <h2 className="text-xl font-bold mb-4 text-center my-6">
            Produits : <span className="text-blue-500">{produits.length}</span>
          </h2>

          <table className="min-w-full table-auto">

            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Prix</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Stock</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Catégorie</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Date création</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Actions</th>
              </tr>
            </thead>

            <tbody>
              {produits.length > 0 ? (
                produits.map((prod) => (
                  <tr key={prod.ID_produit} className="border-b hover:bg-gray-50">

                    <td className="px-4 py-2">{prod.ID_produit}</td>

                    <td className="px-4 py-2 font-medium">
                      {prod.Nom_produit}
                    </td>

                    <td className="px-4 py-2">
                      {prod.Prix} FCFA
                    </td>

                    <td className="px-4 py-2 hidden md:table-cell">
                      {getStock(prod.ID_produit)}
                    </td>

                    <td className="px-4 py-2 hidden md:table-cell">
                      {prod.ID_categorie}
                    </td>

                    <td className="px-4 py-2 hidden md:table-cell">
                      {formatDateFR(prod.Date_creation)}
                    </td>

                    <td className="px-4 py-2 hidden md:table-cell space-x-2">

                      <button className="px-2 py-1 bg-green-500 text-white rounded">
                        Voir
                      </button>

                      <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                        Modifier
                      </button>

                      <button className="px-2 py-1 bg-red-500 text-white rounded">
                        Supprimer
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Aucun produit trouvé
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default ProduitsAdmin;