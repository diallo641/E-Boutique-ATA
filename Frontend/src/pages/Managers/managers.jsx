import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deconnexion } from "../JS/deconnexion";
import { getDashboardStats } from "../JS/statistiqueManager";

function DashboardAdmin() {

  const [stats, setStats] = useState({
    totalClients: 0,
    totalEmployes: 0,
    totalCommandes: 0,
    totalBoutiques: 0,
    totalCategories: 0,
    totalStocks: 0,
    boutiques: [],
    stocks: [],
  });

  //Charger les données au démarrage
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
    { title: "Employés", value: stats.totalEmployes },
    { title: "Clients", value: stats.totalClients },
    { title: "Boutiques", value: stats.totalBoutiques },
    { title: "Commandes", value: stats.totalCommandes },
    { title: "Categories", value: stats.totalCategories },
    { title: "Stocks", value: stats.totalStocks }
    
  ];

  //Prendre les 5 derniers clients
  const recentBoutiques = stats.boutiques.slice(0, 5);
  const stocksBoutiques = stats.stocks.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
      <header className="bg-white shadow p-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-xl font-bold mb-4 md:mb-0">Dashboard Manager</h1>
       
        <nav className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          <Link to="/employes" className="text-blue-500 hover:underline">Employes</Link>
          <Link to="/clients" className="text-blue-500 hover:underline">Clients</Link>
          <Link to="/clients" className="text-blue-500 hover:underline">Boutiques</Link>
          <Link to="/commandes" className="text-blue-500 hover:underline">Commandes</Link>
          <Link to="/categories" className="text-blue-500 hover:underline">Categories</Link>
          <Link to="/produits" className="text-blue-500 hover:underline">Produits</Link>
          

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

      {/* Tableau  récents */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Boutiques</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nom_boutique</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Adresse</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Télephone</th>
              </tr>
            </thead>

            <tbody>
              {recentBoutiques.length > 0 ? (
                recentBoutiques.map((boutique) => (
                  <tr key={boutique.ID_boutique} className="border-b">
                    <td className="px-4 py-2">{boutique.ID_boutique}</td>
                    <td className="px-4 py-2">{boutique.Nom_boutique}</td>
                    <td className="px-4 py-2">{boutique.Email}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{boutique.Adresse}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{boutique.Telephone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Aucun 
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </section>

      {/* Tableau  récents */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Produist en Stocks</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID_boutique</th>
                <th className="px-4 py-2 text-left">ID_produit</th>
                <th className="px-4 py-2 text-left">Quantité</th>
              </tr>
            </thead>

            <tbody>
              {stocksBoutiques.length > 0 ? (
                stocksBoutiques.map((stock) => (
                  <tr key={`${stock.ID_boutique}-${stock.ID_produit}`} className="border-b">
                    <td className="px-4 py-2">{stock.ID_boutique}</td>
                    <td className="px-4 py-2">{stock.ID_produit}</td>
                    <td className="px-4 py-2">{stock.Quantite}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Aucun 
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