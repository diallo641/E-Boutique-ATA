import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import HeaderAdmin from "../../composants/HeaderDashboard";
import { getStockDetail } from "../JS/VoirStock";

function VoirStock() {

  const { idProduit, idBoutique } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getStockDetail(idProduit, idBoutique);
      setStock(data);
      setLoading(false);
    };

    load();
  }, [idProduit, idBoutique]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!stock) return <p className="text-center mt-10">Stock introuvable</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderAdmin />

      <div className="max-w-3xl mx-auto bg-white p-6 mt-10 rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          Détail du stock
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Produit</p>
            <p className="font-bold">
              {stock.Nom_produit || `Produit ID ${stock.ID_produit}`}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Boutique</p>
            <p className="font-bold">
              {stock.Nom_boutique || `Boutique ID ${stock.ID_boutique}`}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Quantité</p>
            <p className="font-bold text-green-600 text-lg">
              {stock.Quantite}
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <Link
            to={`/EditerStock/${stock.ID_produit}/${stock.ID_boutique}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Modifier
          </Link>

          <Link
            to={`/DeleteStock/${stock.ID_produit}/${stock.ID_boutique}`}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Supprimer
          </Link>

          <button
            onClick={() => navigate("/StockAdmin")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Retour
          </button>

        </div>

      </div>
    </div>
  );
}

export default VoirStock;