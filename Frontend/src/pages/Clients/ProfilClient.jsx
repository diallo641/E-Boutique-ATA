import HeaderAdmin from "../../composants/HeaderDashboard";
import { useProfilClient } from "../JS/ProfilClient";

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

        <h2 className="text-2xl font-bold mb-6 text-center">
          Profil client
        </h2>

        <div className="space-y-4">

          <p><strong>ID :</strong> {client.ID_client}</p>
          <p><strong>Nom :</strong> {client.Nom}</p>
          <p><strong>Adresse :</strong> {client.Adresse}</p>
          <p><strong>Téléphone :</strong> {client.Telephone}</p>
          <p><strong>Email :</strong> {client.Email}</p>

        </div>

      </div>

    </div>
  );
}

export default ProfilClient;