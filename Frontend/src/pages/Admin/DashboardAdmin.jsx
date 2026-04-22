import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../JS/statisques";
import HeaderAdmin from "../../composants/HeaderDashboard";


function DashboardAdmin() {

  const [stats, setStats] = useState({
    totalClients: 0,
    totalComptes: 0,
    totalManagers: 0,
    totalEmployes: 0,
    totalCommandes: 0,
    totalBoutiques: 0,
    clients: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Charger les données
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        if (data) {
          setStats(data);
        } else {
          setError("Erreur lors du chargement des statistiques");
        }
      } catch (err) {
        setError("Erreur serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 🔹 Cartes statistiques
  const statsCards = [
    { title: "Clients", value: stats.totalClients },
    { title: "Comptes", value: stats.totalComptes },
    { title: "Managers", value: stats.totalManagers },
    { title: "Employés", value: stats.totalEmployes },
    { title: "Commandes", value: stats.totalCommandes },
    { title: "Boutiques", value: stats.totalBoutiques }
  ];

  // 🔹 Trier pour avoir les derniers clients
  const recentClients = [...stats.clients]
    .sort((a, b) => b.ID_client - a.ID_client)
    .slice(0, 5);

  // 🔹 Loading
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Chargement des données...
      </div>
    );
  }

  // 🔹 Erreur
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <HeaderAdmin />

      {/* Statistiques */}
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded shadow text-center hover:shadow-md transition">
            <h2 className="text-gray-500">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Clients récents */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Clients récents</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Téléphone</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">ID Client</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Actions</th>
              </tr>
            </thead>

            <tbody>
              {recentClients.length > 0 ? (
                recentClients.map((client) => (
                  <tr key={client.ID_client} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{client.Nom}</td>
                    <td className="px-4 py-2">{client.Telephone}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{client.ID_client}</td>

                    <td className="px-4 py-2 space-x-2 hidden md:table-cell">
                      <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        Voir
                      </button>
                      <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Modifier
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
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
        &copy; 2026 Ma Boutique. Tous droits réservés.
      </footer>

    </div>
  );
}

export default DashboardAdmin;