import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../composants/HeaderDashboard";
import { ajouterStock, getProduits, getBoutiques } from "../JS/AjoutStock";

function AjoutStock() {

  const navigate = useNavigate();

  const [produits, setProduits] = useState([]);
  const [boutiques, setBoutiques] = useState([]);

  const [formulaire, setFormulaire] = useState({
    ID_produit: "",
    ID_boutique: "",
    Quantite: ""
  });

  const [message, setMessage] = useState("");

  // LOAD LISTES
  useEffect(() => {
    const load = async () => {
      setProduits(await getProduits());
      setBoutiques(await getBoutiques());
    };

    load();
  }, []);

  // CHANGE INPUT
  const handleChange = (e) => {
    setFormulaire({
      ...formulaire,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await ajouterStock({
      ...formulaire,
      Quantite: Number(formulaire.Quantite)
    });

    setMessage(result?.message || "Erreur");

    if (result) {
      setTimeout(() => navigate("/StockAdmin"), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        <h2 className="text-2xl font-bold mb-6">
          Ajouter un stock
        </h2>

        {message && (
          <p className="mb-4 text-center text-blue-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PRODUIT */}
          <select
            name="ID_produit"
            value={formulaire.ID_produit}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Produit --</option>
            {produits.map((p) => (
              <option key={p.ID_produit} value={p.ID_produit}>
                {p.Nom_produit}
              </option>
            ))}
          </select>

          {/* BOUTIQUE */}
          <select
            name="ID_boutique"
            value={formulaire.ID_boutique}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Boutique --</option>
            {boutiques.map((b) => (
              <option key={b.ID_boutique} value={b.ID_boutique}>
                {b.Nom_boutique}
              </option>
            ))}
          </select>

          {/* QUANTITE */}
          <input
            type="number"
            name="Quantite"
            value={formulaire.Quantite}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Quantité"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Ajouter stock
          </button>

        </form>

      </div>
    </div>
  );
}

export default AjoutStock;