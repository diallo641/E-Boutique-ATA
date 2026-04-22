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
    employes: [] // 🔥 IMPORTANT
  });

  // 🔹 Charger les données
  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      if (data) setStats(data);
    };

    fetchStats();
  }, []);

  // 🔹 Cartes
  const statsCards = [
    { title: "Clients", value: stats.totalClients },
    { title: "Comptes", value: stats.totalComptes },
    { title: "Managers", value: stats.totalManagers },
    { title: "Employés", value: stats.totalEmployes },
    { title: "Commandes", value: stats.totalCommandes },
    { title: "Boutiques", value: stats.totalBoutiques }
  ];

  // 🔥 5 derniers employés
  const recentEmployes = [...stats.employes]
    .sort((a, b) => b.ID_employe - a.ID_employe)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <HeaderAdmin />

      {/* STATS */}
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-gray-500">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* 🔥 BOUTON AJOUT EMPLOYÉ */}
      <section className="px-6 mb-4">
        <Link to="/AjoutEmploye">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            + Ajouter Employé
          </button>
        </Link>
      </section>

      {/* 👇 EMPLOYÉS RÉCENTS */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Employés récents</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">

            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Prénom</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Téléphone</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Boutique</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {recentEmployes.length > 0 ? (
                recentEmployes.map((e) => (
                  <tr key={e.ID_employe} className="border-b hover:bg-gray-50">

                    <td className="px-4 py-2">{e.Nom}</td>
                    <td className="px-4 py-2">{e.Prenom}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{e.Telephone}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{e.ID_boutique}</td>

                    <td className="px-4 py-2 space-x-2">

                      <Link to={`/EditerEmploye/${e.ID_employe}`}>
                        <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                          Modifier
                        </button>
                      </Link>

                      <Link to={`/DeleteEmploye/${e.ID_employe}`}>
                        <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          Supprimer
                        </button>
                      </Link>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Aucun employé trouvé
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white shadow p-4 text-center text-gray-500">
        &copy; 2026 Ma Boutique. Tous droits réservés.
      </footer>

    </div>
  );
}

export default DashboardAdmin;