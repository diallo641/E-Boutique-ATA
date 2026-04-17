import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deconnexion } from "../JS/deconnexion";
import { getDashboardStats } from "../JS/statisques";

function DashboardAdmin() {

  const [stats, setStats] = useState({
    totalClients: 0,
    totalComptes: 0,
    totalManagers: 0,
    totalEmployes: 0,
    totalCommandes: 0,
    Nombreboutiques: 0,
    clients: []
  });

  // 🔹 Charger les données au démarrage
  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      if (data) {
        setStats(data);
      }
    };

    fetchStats();
  }, []);

  //Construire les cartes statistiques
  const statsCards = [
    { title: "Clients", value: stats.totalClients },
    { title: "Comptes", value: stats.totalComptes },
    { title: "Managers", value: stats.totalManagers },
    { title: "Employés", value: stats.totalEmployes },
    { title: "Commandes", value: stats.totalCommandes },
    { title: "Boutiques", value: stats.totalBoutiques }
  ];

  //Prendre les 5 derniers clients
  const recentClients = stats.clients.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
      <header className="bg-white shadow p-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-xl font-bold mb-4 md:mb-0">Dashboard Employes</h1>
       
        <nav className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          <Link to="/Manager" className="text-blue-500 hover:underline">Manager</Link>
          <Link to="/employes" className="text-blue-500 hover:underline">Employes</Link>
          <Link to="/clients" className="text-blue-500 hover:underline">Clients</Link>
          <Link to="/DashboardComptes" className="text-blue-500 hover:underline">Comptes</Link>
          <Link to="/categories" className="text-blue-500 hover:underline">Categories</Link>
          <Link to="/produits" className="text-blue-500 hover:underline">Produits</Link>
          <Link to="/commandes" className="text-blue-500 hover:underline">Commandes</Link>
          <Link to="/details" className="text-blue-500 hover:underline">Details</Link>

          {/* Bouton déconnexion */}
          <button
            onClick={deconnexion}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
        </nav>
      </header>

      {/* Statistiques */}
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-gray-500">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Tableau clients récents */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Clients récents</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Téléphone</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">ID Compte</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Actions</th>
              </tr>
            </thead>

            <tbody>
              {recentClients.length > 0 ? (
                recentClients.map((client) => (
                  <tr key={client.ID_client} className="border-b">
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