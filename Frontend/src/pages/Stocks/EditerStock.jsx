import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderAdmin from "../../composants/HeaderDashboard";
import { getStockDetail, updateStock } from "../JS/EditerStock";

function EditerStock() {

  const { ID_produit, ID_boutique } = useParams();
  const navigate = useNavigate();

  const [quantite, setQuantite] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔥 message UI
  const [message, setMessage] = useState(null); // {type: "success" | "error", text: ""}

  // LOAD STOCK
  useEffect(() => {
    const load = async () => {
      const data = await getStockDetail(ID_produit, ID_boutique);

      if (data) {
        setQuantite(data.Quantite || 0);
      }

      setLoading(false);
    };

    load();
  }, [ID_produit, ID_boutique]);

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = await updateStock(
      ID_produit,
      ID_boutique,
      Number(quantite)
    );

    setSaving(false);

    if (result) {
      setMessage({
        type: "success",
        text: "Stock modifié avec succès ✔"
      });

      // optionnel : retour auto après 1.5s
      setTimeout(() => {
        navigate("/StockAdmin");
      }, 1500);

    } else {
      setMessage({
        type: "error",
        text: "Erreur lors de la modification ❌"
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        <h2 className="text-2xl font-bold mb-6 text-yellow-600">
          Modifier le stock
        </h2>

        {/* 🔥 MESSAGE UI */}
        {message && (
          <div
            className={`p-3 mb-4 rounded text-white ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm">Produit ID</label>
            <input
              value={ID_produit}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm">Boutique ID</label>
            <input
              value={ID_boutique}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm">Quantité</label>
            <input
              type="number"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
              className="w-full p-2 border rounded"
              min="0"
              required
            />
          </div>

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={saving}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              {saving ? "Modification..." : "Modifier"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/StockAdmin")}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditerStock;