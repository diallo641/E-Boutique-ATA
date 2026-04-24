import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoutiques, ajouterBoutique } from "../JS/BoutiqueAdmin";
import HeaderAdmin from "../../composants/HeaderDashboard";

function BoutiqueAdmin() {

  const [boutiques, setBoutiques] = useState([]);

  // 🔹 Charger les boutiques
  useEffect(() => {
    const fetchBoutiques = async () => {
      const data = await getBoutiques();
      if (data) {
        setBoutiques(data.boutiques || []);
      }
    };

    fetchBoutiques();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <HeaderAdmin />

      {/* 🔹 BOUTON AJOUT */}
      <section className="p-6">
        <Link to="/AjoutBoutique">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            + Ajouter Boutique
          </button>
        </Link>
      </section>

      {/* 🔹 TABLE */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Liste des Boutiques</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">

            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Email</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Adresse</th>
                <th className="px-4 py-2 text-left">Téléphone</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Actions</th>
              </tr>
            </thead>

            <tbody>
              {boutiques.length > 0 ? (
                boutiques.map((b) => (
                  <tr key={b.ID_boutique} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{b.Nom_boutique}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{b.Email}</td>
                    <td className="px-4 py-2 hidden md:table-cell">{b.Adresse}</td>
                    <td className="px-4 py-2">{b.Telephone}</td>

                    <td className="px-4 py-2 space-x-2 hidden md:table-cell">

                      <Link to={`/VoirBoutique/${b.ID_boutique}`}>
                        <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                          
                        </button>
                      </Link>

                      <Link to={`/EditerBoutique/${b.ID_boutique}`}>
                        <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                          
                        </button>
                      </Link>

                      <Link to={`/DeleteBoutique/${b.ID_boutique}`}>
                        <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          
                        </button>
                      </Link>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Aucune boutique trouvée
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

export default BoutiqueAdmin;