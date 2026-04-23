import HeaderAdmin from "../../composants/HeaderDashboard";
import { Link } from "react-router-dom";
import { useSupprimerClient } from "../JS/DeleteClient";

function DeleteClient() {

  const {
    chargement,
    message,
    confirmerSuppression,
    annulerSuppression
  } = useSupprimerClient();

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
          Supprimer un client
        </h2>

        {/* UI placeholder (tu peux remplacer par data API plus tard) */}
        <div className="mb-6 text-center space-y-2">
          <p><strong>Nom :</strong> Client</p>
          <p><strong>Téléphone :</strong> 77 000 00 00</p>
          <p><strong>Email :</strong> client@email.com</p>
        </div>

        {/* message backend */}
        {message && (
          <p className="text-center mb-4 text-gray-700">
            {message}
          </p>
        )}

        {/* boutons */}
        <div className="space-y-3">

          <button
            onClick={confirmerSuppression}
            disabled={chargement}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            {chargement ? "Suppression..." : "Confirmer la suppression"}
          </button>

          <button
            onClick={annulerSuppression}
            className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
          >
            Annuler
          </button>

        </div>

        {/* retour */}
        <div className="mt-6 text-center">
          <Link
            to="/Clients"
            className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Retour à la liste
          </Link>
        </div>

      </div>

    </div>
  );
}

export default DeleteClient;