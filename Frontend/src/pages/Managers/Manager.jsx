import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deconnexion } from "../JS/deconnexion";
import { getDashboardStats } from "../JS/statistiqueManager";
import HeaderAdmin from "../../composants/HeaderDashboard";

function DashboardAdmin() {

  const [stats, setStats] = useState({
    totalClients: 0,
    totalEmployes: 0,
    totalCommandes: 0,
    totalBoutiques: 0,
    totalCategories: 0,
    totalStocks: 0,
    employes: [],
    boutiques: [],
    stocks: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      if (data) setStats(data);
    };

    fetchStats();
  }, []);

  const statsCards = [
    { title: "Employés", value: stats.totalEmployes },
    { title: "Clients", value: stats.totalClients },
    { title: "Boutiques", value: stats.totalBoutiques },
    { title: "Commandes", value: stats.totalCommandes },
    { title: "Stocks", value: stats.totalStocks }
  ];

  // 🔥 5 derniers employés
  const recentEmployes = [...stats.employes]
    .sort((a, b) => b.ID_employe - a.ID_employe)
    .slice(0, 5);

  const recentBoutiques = stats.boutiques.slice(0, 5);
  const stocksBoutiques = stats.stocks.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <HeaderAdmin />

      {/* STATISTIQUES */}
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-gray-500">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* 🔥 BOUTON AJOUT EMPLOYÉ */}
      <section className="px-6">
        <Link to="/AjoutEmploye">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
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

      {/* BOUTIQUES */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Boutiques</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">

            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Email</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Adresse</th>
                <th className="px-4 py-2 text-left">Téléphone</th>
              </tr>
            </thead>

            <tbody>
              {recentBoutiques.length > 0 ? (
                recentBoutiques.map((b) => (
                  <tr key={b.ID_boutique} className="border-b">
                    <td className="px-4 py-2">{b.ID_boutique}</td>
                    <td className="px-4 py-2">{b.Nom_boutique}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{b.Email}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{b.Adresse}</td>
                    <td className="px-4 py-2">{b.Telephone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Aucun
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </section>

      {/* STOCKS */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Stocks</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">

            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Boutique</th>
                <th className="px-4 py-2 text-left">Produit</th>
                <th className="px-4 py-2 text-left">Quantité</th>
              </tr>
            </thead>

            <tbody>
              {stocksBoutiques.length > 0 ? (
                stocksBoutiques.map((s) => (
                  <tr key={`${s.ID_boutique}-${s.ID_produit}`} className="border-b">
                    <td className="px-4 py-2">{s.ID_boutique}</td>
                    <td className="px-4 py-2">{s.ID_produit}</td>
                    <td className="px-4 py-2">{s.Quantite}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Aucun
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