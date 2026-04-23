import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deconnexion } from "../JS/deconnexion";
import { getClients } from "../JS/Clients"; 
import HeaderAdmin from "../../composants/HeaderDashboard";


function ClientsAdmin() {

  const [clients, setClients] = useState([]);

  // 🔹 Charger les clients au démarrage
  useEffect(() => {
    const fetchClients = async () => {
      const data = await getClients();
      if (data) {
        setClients(data);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <HeaderAdmin />

      {/* Top section */}
      <section className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <input
          type="text"
          placeholder="Rechercher un client..."
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* 🔹 Bouton sous forme de Link */}
        <Link
          to="/AjoutClient"
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-center"
        >
          + Ajouter un client
        </Link>

      </section>

      {/* Tableau */}
      <section className="px-6 pb-6">
        <div className="overflow-x-auto bg-white rounded shadow">

          {/* 🔥 Nombre de clients */}
          <h2 className="text-xl font-bold mb-4 text-center my-6">
            Clients : <span className="text-blue-500">{clients.length}</span>
          </h2>

          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Téléphone</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Email</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Actions</th>
              </tr>
            </thead>

            <tbody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.ID_client} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{client.ID_client}</td>
                    <td className="px-4 py-2">{client.Nom}</td>
                    <td className="px-4 py-2">{client.Telephone}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{client.Email}</td>

                    <td className="px-4 py-2 space-x-2 hidden md:table-cell">
                      <Link to={`/ProfilClient/${client.ID_client}`}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        Voir
                      </Link>
                      <Link to={`/EditerClient/${client.ID_client}`}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Modifier
                      </Link>
                      <Link to={`/DeleteClient/${client.ID_client}`}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Supprimer
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Aucun client trouvé
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow p-4 text-center text-gray-500">
        &copy; 2026 Ma Boutique
      </footer>

    </div>
  );
}

export default ClientsAdmin;