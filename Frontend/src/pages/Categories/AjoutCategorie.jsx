import HeaderAdmin from "../../composants/HeaderDashboard";
import { useAjoutCategorie } from "../JS/AjoutCategorie";
import { Link } from "react-router-dom";

function AjoutCategorie() {

  const {
    formulaire,
    message,
    chargement,
    gererChangement,
    soumettreFormulaire
  } = useAjoutCategorie();

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Ajouter une catégorie
          </h2>

          <Link
            to="/Categories"
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Retour
          </Link>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center mb-4 text-gray-700">
            {message}
          </p>
        )}

        {/* Formulaire */}
        <form onSubmit={soumettreFormulaire} className="space-y-4">

          {/* Nom */}
          <input
            type="text"
            name="Nom_categorie"
            value={formulaire.Nom_categorie}
            onChange={gererChangement}
            placeholder="Nom de la catégorie"
            className="w-full px-4 py-2 border rounded"
          />

          {/* Description */}
          <textarea
            name="Description"
            value={formulaire.Description}
            onChange={gererChangement}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded"
          />

          {/* Bouton */}
          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {chargement ? "Création..." : "Créer la catégorie"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AjoutCategorie;