import { Link } from "react-router-dom";
import { deconnexion } from "../JS/deconnexion";
import { useEffect, useState } from "react";
import { getComptes, formatDateFR } from "../JS/StatistiqueComptes";
import HeaderAdmin from "../../composants/HeaderDashboard";

function ComptesAdmin() {

  const [comptes, setComptes] = useState([]);

  useEffect(() => {
    const fetchComptes = async () => {
      const data = await getComptes();
      console.log("DATA =>", data);
      if (data) {
        setComptes(data);
      }
    };

    fetchComptes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <HeaderAdmin />

      {/* Top section */}
      <section className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <input
          type="text"
          placeholder="Rechercher un compte..."
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Link to="/AjoutCompte">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            + Ajouter un compte
          </button>
        </Link>

      </section>

      {/* Tableau */}
      <section className="px-6 pb-6">
        <div className="overflow-x-auto bg-white rounded shadow">

          <h2 className="text-xl font-bold mb-4 text-center my-6">
            Comptes : <span className="text-blue-500">{comptes.length}</span>
          </h2>

          <table className="min-w-full table-auto">

            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Rôle</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Date création</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Date modification</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Actions</th>
              </tr>
            </thead>

            <tbody>
              {comptes.length > 0 ? (
                comptes.map((compte) => (
                  <tr key={compte.ID_compte} className="border-b hover:bg-gray-50">

                    <td className="px-4 py-2">{compte.ID_compte}</td>
                    <td className="px-4 py-2">{compte.Email}</td>
                    <td className="px-4 py-2">{compte.Nom_role}</td>
                    <td className="px-4 py-2">{formatDateFR(compte.Date_creation)}</td>
                    <td className="px-4 py-2">{formatDateFR(compte.Date_modification)}</td>

                    {/* ACTIONS */}
                    <td className="px-4 py-2 space-x-2 hidden md:table-cell">

                      {/* Modifier */}
                      <Link
                        to={`/EditerCompte/${compte.ID_compte}`}
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Modifier
                      </Link>

                      {/* Supprimer */}
                      <Link
                        to={`/DeleteCompte/${compte.ID_compte}`}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Supprimer
                      </Link>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Aucun compte trouvé
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

export default ComptesAdmin;