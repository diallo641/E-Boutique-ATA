import HeaderAdmin from "../../composants/HeaderDashboard";
import { Link } from "react-router-dom";
import { useSupprimerCompte } from "../JS/DeleteCompte";

function DeleteCompte() {

  const {
    compte,
    chargement,
    message,
    confirmation,
    confirmerSuppression,
    annulerSuppression,
    supprimerCompte
  } = useSupprimerCompte();

  if (chargement) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  if (!compte) {
    return <p className="text-center mt-10">Compte introuvable</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
          Supprimer un compte
        </h2>

        {/* Infos */}
        <div className="mb-6 text-center space-y-2">
          <p><strong>Email :</strong> {compte.Email}</p>
          <p><strong>Rôle :</strong> {compte.Nom_role}</p>
        </div>

        {message && (
          <p className="text-center mb-4">{message}</p>
        )}

        <p className="text-center text-gray-600 mb-4">
          ⚠️ Cette action est irréversible
        </p>

        {/* Boutons */}
        {!confirmation ? (
          <button
            onClick={confirmerSuppression}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Confirmer la suppression
          </button>
        ) : (
          <div className="space-y-3">

            <button
              onClick={supprimerCompte}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Oui, supprimer définitivement
            </button>

            <button
              onClick={annulerSuppression}
              className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Annuler
            </button>

          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/Comptes"
            className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Retour
          </Link>
        </div>

      </div>

    </div>
  );
}

export default DeleteCompte;