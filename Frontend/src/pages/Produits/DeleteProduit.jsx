import HeaderAdmin from "../../composants/HeaderDashboard";
import { Link } from "react-router-dom";
import { useDeleteProduit } from "../JS/DeleteProduit";

function DeleteProduit() {

  const {
    produit,
    message,
    chargement,
    supprimerProduit
  } = useDeleteProduit();

  if (chargement) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">
            Supprimer un produit
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

        {/* CONFIRMATION */}
        {produit && (
          <div className="space-y-4">

            <p className="text-lg">
              Es-tu sûr de vouloir supprimer ce produit ?
            </p>

            <div className="bg-gray-50 p-4 rounded border">
              <p><strong>Nom :</strong> {produit.Nom_produit}</p>
              <p><strong>Prix :</strong> {produit.Prix} FCFA</p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4">

              <button
                onClick={supprimerProduit}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Oui, supprimer
              </button>

              <Link
                to="/Produits"
                className="w-full text-center bg-gray-300 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </Link>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default DeleteProduit;