import HeaderAdmin from "../../composants/HeaderDashboard";
import { useProfilClient } from "../JS/ProfilClient";
import { Link } from "react-router-dom";

function ProfilClient() {

  const { client, loading } = useProfilClient();

  if (loading) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  if (!client) {
    return <p className="text-center mt-10">Client introuvable</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded shadow">

        {/* Titre */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Profil client
        </h2>

        {/* Infos */}
        <div className="space-y-4 border-b pb-6">
          <p><strong>ID :</strong> {client.ID_client}</p>
          <p><strong>Nom :</strong> {client.Nom}</p>
          <p><strong>Adresse :</strong> {client.Adresse}</p>
          <p><strong>Téléphone :</strong> {client.Telephone}</p>
          <p><strong>Email :</strong> {client.Email}</p>
        </div>

        {/* Boutons actions */}
        <div className="flex justify-between mt-6">

          <Link
            to={`/EditerClient/${client.ID_client}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Modifier
          </Link>

          <Link
            to="/Clients"
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Retour
          </Link>

          <Link
            to={`/DeleteClient/${client.ID_client}`}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Supprimer
          </Link>

        </div>

      </div>
    </div>
  );
}

export default ProfilClient;