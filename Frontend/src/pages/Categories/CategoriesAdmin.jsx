import { Link } from "react-router-dom";
import { deconnexion } from "../JS/deconnexion";
import { useState, useEffect } from "react";
import { getCategories, formatDateFR } from "../JS/statistiqueCategorie";

function CategoriesAdmin() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      if (data) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-white shadow p-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-xl font-bold mb-4 md:mb-0">
          Dashboard Catégories
        </h1>

        <nav className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          <Link to="/Manager" className="text-blue-500 hover:underline">Manager</Link>
          <Link to="/employes" className="text-blue-500 hover:underline">Employés</Link>
          <Link to="/Clients" className="text-blue-500 hover:underline">Clients</Link>
          <Link to="/Comptes" className="text-blue-500 hover:underline">Comptes</Link>
          <Link to="/Categories" className="text-blue-500 hover:underline">Catégories</Link>
          <Link to="/Produits" className="text-blue-500 hover:underline">Produits</Link>
          <Link to="/commandes" className="text-blue-500 hover:underline">Commandes</Link>

          <button
            onClick={deconnexion}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Déconnexion
          </button>
        </nav>
      </header>

      {/* TOP SECTION */}
      <section className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <input
          type="text"
          placeholder="Rechercher une catégorie..."
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          + Ajouter une catégorie
        </button>

      </section>

      {/* TABLE */}
      <section className="px-6 pb-6">
        <div className="overflow-x-auto bg-white rounded shadow">

          <h2 className="text-xl font-bold mb-4 text-center my-6">
            Catégories : <span className="text-blue-500">{categories.length}</span>
          </h2>

          <table className="min-w-full table-auto">

            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nom</th>
                
                <th className="px-4 py-2 text-left hidden md:table-cell">Date création</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Date modification</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.ID_categorie} className="border-b hover:bg-gray-50">

                    <td className="px-4 py-2">{cat.ID_categorie}</td>

                    <td className="px-4 py-2 font-medium">
                      {cat.Nom_categorie}
                    </td>

                    <td className="px-4 py-2 hidden md:table-cell">
                      {formatDateFR(cat.Date_creation)}
                    </td>
                   
                    <td className="px-4 py-2 hidden md:table-cell">
                      {formatDateFR(cat.Date_modification)}
                    </td>


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
                  <td colSpan="5" className="text-center py-4">
                    Aucune catégorie trouvée
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white shadow p-4 text-center text-gray-500">
        &copy; 2026 Ma Boutique
      </footer>

    </div>
  );
}

export default CategoriesAdmin;