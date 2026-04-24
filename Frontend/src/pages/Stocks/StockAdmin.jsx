import { useEffect, useState } from "react";
import HeaderAdmin from "../../composants/HeaderDashboard";
import { Link } from "react-router-dom";
import { getStocks } from "../JS/statistiqueStock";

function StockAdmin() {

  const [stocks, setStocks] = useState([]);
  const [groupedStocks, setGroupedStocks] = useState({});
  const [chargement, setChargement] = useState(true);

  // LOAD DATA
  useEffect(() => {
    const load = async () => {
      const data = await getStocks();
      setStocks(data || []);
      setChargement(false);
    };

    load();
  }, []);

  // GROUP BY BOUTIQUE
  useEffect(() => {
    const grouped = {};

    stocks.forEach((s) => {
      if (!grouped[s.ID_boutique]) {
        grouped[s.ID_boutique] = [];
      }
      grouped[s.ID_boutique].push(s);
    });

    setGroupedStocks(grouped);
  }, [stocks]);

  if (chargement) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold">
            Gestion des Stocks par boutique
          </h1>

          {/* AJOUT STOCK */}
          <Link
            to="/AjoutStock"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Ajouter stock
          </Link>

        </div>

        {/* CONTENT */}
        {Object.keys(groupedStocks).length === 0 ? (
          <p>Aucun stock trouvé</p>
        ) : (
          Object.entries(groupedStocks).map(([idBoutique, stocksBoutique]) => (

            <div key={idBoutique} className="mb-10 bg-white p-4 rounded shadow">

              <h2 className="text-xl font-bold mb-4 text-blue-600">
                Boutique ID : {idBoutique}
              </h2>

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3 text-left">Produit</th>
                      <th className="p-3 text-left">Quantité</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {stocksBoutique.map((stock, index) => (

                      <tr key={index} className="border-b">

                        <td className="p-3">
                          {stock.Nom_produit || stock.ID_produit}
                        </td>

                        <td className="p-3 font-bold">
                          {stock.Quantite}
                        </td>

                        {/* ACTIONS */}
                        <td className="p-3 space-x-2">

                          <Link
                            to={`/VoirStock/${stock.ID_produit}/${stock.ID_boutique}`}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Voir
                          </Link>

                          <Link
                            to={`/EditerStock/${stock.ID_produit}/${stock.ID_boutique}`}
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                          >
                            Modifier
                          </Link>

                          <Link
                            to={`/DeleteStock/${stock.ID_produit}/${stock.ID_boutique}`}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Supprimer
                          </Link>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          ))
        )}

      </div>
    </div>
  );
}

export default StockAdmin;