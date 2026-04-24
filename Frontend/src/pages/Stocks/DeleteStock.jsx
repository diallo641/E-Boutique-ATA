import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderAdmin from "../../composants/HeaderDashboard";
import { getStockDetail } from "../JS/EditerStock";
import { deleteStock } from "../JS/DeleteStock";

function DeleteStock() {

  const { ID_produit, ID_boutique } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState(null);

  // LOAD STOCK
  useEffect(() => {
    const load = async () => {
      const data = await getStockDetail(ID_produit, ID_boutique);
      setStock(data);
      setLoading(false);
    };

    load();
  }, [ID_produit, ID_boutique]);

  // DELETE
  const handleDelete = async () => {
    setDeleting(true);
    setMessage(null);

    const result = await deleteStock(ID_produit, ID_boutique);

    setDeleting(false);

    if (result) {
      setMessage({
        type: "success",
        text: "Stock supprimé avec succès ✔"
      });

      setTimeout(() => {
        navigate("/StockAdmin");
      }, 1500);

    } else {
      setMessage({
        type: "error",
        text: "Erreur lors de la suppression ❌"
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  if (!stock) return <p className="text-center mt-10">Stock introuvable</p>;

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        <h2 className="text-2xl font-bold mb-6 text-red-600">
          Supprimer le stock
        </h2>

        {/* MESSAGE */}
        {message && (
          <div
            className={`p-3 mb-4 rounded text-white ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* INFO STOCK */}
        <div className="bg-gray-50 p-4 rounded mb-6">

          <p><strong>Produit ID :</strong> {ID_produit}</p>
          <p><strong>Boutique ID :</strong> {ID_boutique}</p>
          <p><strong>Quantité :</strong> {stock?.Quantite}</p>

        </div>

        <p className="text-gray-600 mb-4">
          ⚠️ Cette action est irréversible. Voulez-vous vraiment supprimer ce stock ?
        </p>

        {/* ACTIONS */}
        <div className="flex gap-3">

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            {deleting ? "Suppression..." : "Supprimer"}
          </button>

          <button
            onClick={() => navigate("/StockAdmin")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuler
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteStock;