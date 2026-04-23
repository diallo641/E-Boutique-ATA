import HeaderAdmin from "../../composants/HeaderDashboard";
import { Link } from "react-router-dom";
import { useSupprimerCategorie } from "../JS/DeleteCategorie";

function DeleteCategorie() {

  const {
    categorie,
    chargement,
    message,
    confirmation,
    confirmerSuppression,
    annulerSuppression,
    supprimerCategorie
  } = useSupprimerCategorie();

  if (chargement) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  if (!categorie) {
    return <p className="text-center mt-10 text-red-600">Catégorie introuvable</p>;
  }

  // 🔥 détecter si c’est une erreur (produits liés)
  const estErreur = message && message.toLowerCase().includes("impossible");

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        {/* Titre */}
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
          Supprimer une catégorie
        </h2>

        {/* Infos */}
        <div className="mb-6 text-center space-y-2">
          <p><strong>Nom :</strong> {categorie.Nom_categorie}</p>
          <p><strong>Description :</strong> {categorie.Description}</p>
        </div>

        {/* Message */}
        {message && (
          <p className={`text-center mb-4 font-medium ${
            estErreur ? "text-red-600" : "text-green-600"
          }`}>
            {message}
          </p>
        )}

        {/* Avertissement */}
        {!estErreur && (
          <p className="text-center text-gray-600 mb-4">
            ⚠️ Cette action est irréversible
          </p>
        )}

        {/* Actions */}
        {!estErreur && (
          !confirmation ? (
            <button
              onClick={confirmerSuppression}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Confirmer la suppression
            </button>
          ) : (
            <div className="space-y-3">

              <button
                onClick={supprimerCategorie}
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
          )
        )}

        {/* 🔥 Cas bloqué */}
        {estErreur && (
          <div className="text-center mt-4">
            <p className="text-gray-600 mb-3">
              Supprime d'abord les produits liés à cette catégorie.
            </p>
          </div>
        )}

        {/* Retour */}
        <div className="mt-6 text-center">
          <Link
            to="/Categories"
            className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Retour
          </Link>
        </div>

      </div>

    </div>
  );
}

export default DeleteCategorie;