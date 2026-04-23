import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduits, getStockByProduit, formatDateFR } from "../JS/statistiqueproduits";
import HeaderAdmin from "../../composants/HeaderDashboard";

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
        const stock = await getStockByProduit(prod.ID_produit);
        map[prod.ID_produit] = stock || 0;
      }

      setStockMap(map);
    };

    if (produits.length > 0) {
      loadStocks();
    }
  }, [produits]);

  const getStock = (id) => stockMap[id] || 0;

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      {/* TOP */}
      <section className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="w-full md:w-1/3 px-4 py-2 border rounded"
        />

        <Link
          to="/AjoutProduit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Ajouter un produit
        </Link>

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

                      <Link
                        to={`/EditerProduit/${prod.ID_produit}`}
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Modifier
                      </Link>

                      <Link
                        to={`/DeleteProduit/${prod.ID_produit}`}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Supprimer
                      </Link>

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