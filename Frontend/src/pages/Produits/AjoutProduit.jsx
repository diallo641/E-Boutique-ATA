import HeaderAdmin from "../../composants/HeaderDashboard";
import { Link } from "react-router-dom";
import { useAjoutProduit } from "../JS/AjoutProduit";

function AjoutProduit() {

  const {
    formulaire,
    message,
    chargement,
    gererChangement,
    soumettreFormulaire,
    categories
  } = useAjoutProduit();

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Ajouter un produit
          </h2>

          <Link
            to="/Produits"
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Retour
          </Link>
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="text-center mb-4 text-gray-700">
            {message}
          </p>
        )}

        {/* FORMULAIRE */}
        <form onSubmit={soumettreFormulaire} className="space-y-4">

          {/* Nom produit */}
          <input
            type="text"
            name="Nom_produit"
            value={formulaire.Nom_produit}
            onChange={gererChangement}
            placeholder="Nom du produit"
            className="w-full px-4 py-2 border rounded"
          />

          {/* Prix */}
          <input
            type="number"
            name="Prix"
            value={formulaire.Prix}
            onChange={gererChangement}
            placeholder="Prix"
            className="w-full px-4 py-2 border rounded"
          />

          {/* Catégorie (liste déroulante) */}
          <select
            name="ID_categorie"
            value={formulaire.ID_categorie}
            onChange={gererChangement}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">-- Choisir une catégorie --</option>

            {categories.map((cat) => (
              <option key={cat.ID_categorie} value={cat.ID_categorie}>
                {cat.Nom_categorie}
              </option>
            ))}

          </select>

          {/* BTN */}
          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {chargement ? "Création..." : "Créer le produit"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AjoutProduit;