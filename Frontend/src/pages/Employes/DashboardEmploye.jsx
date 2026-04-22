import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardEmploye } from "../JS/DashboardEmploye";
import { deconnexion } from "../JS/deconnexion";

function DashboardEmploye() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardEmploye();

        if (res?.success) {
          setData(res.data);
        } else {
          setData(null);
          console.error(res?.message);
        }
      } catch (error) {
        console.error(error);
        setData(null);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Chargement du dashboard...</p>
      </div>
    );
  }

  if (!data || !data.employe) {
    return (
      <div className="text-center mt-10 text-red-500">
        Erreur chargement dashboard employé
      </div>
    );
  }

  const employe = data.employe;
  const stock = data.stock || [];
  const commandes = data.commandes || [];
  const clients = data.clients || [];

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Bienvenue :{" "}
            <span className="text-blue-600">{employe?.Nom}</span>{" "}
            <span className="text-green-600">{employe?.Prenom}</span>
          </h1>

          <p className="text-gray-500 text-sm md:text-base">
            Boutique ID : {data?.boutique || "N/A"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">

          <button
            onClick={() => navigate("/")}
            className="px-3 py-2 md:px-4 bg-gray-500 text-white rounded text-sm md:text-base"
          >
            Accueil
          </button>

          <button
            onClick={() => {
              deconnexion();
              navigate("/login");
            }}
            className="px-3 py-2 md:px-4 bg-red-500 text-white rounded text-sm md:text-base"
          >
            Déconnexion
          </button>

        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">

        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Stock</p>
          <p className="text-2xl font-bold">{stock.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Commandes</p>
          <p className="text-2xl font-bold">{commandes.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Clients</p>
          <p className="text-2xl font-bold">{clients.length}</p>
        </div>

      </div>

      {/* ================= ACTION ================= */}
      <div className="mb-6 flex justify-center md:justify-end">
        <button
          onClick={() => navigate("/ajoutercommande")}
          className="w-full md:w-auto px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Ajouter commande
        </button>
      </div>

      {/* ================= STOCK ================= */}
      <div className="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-3">Stock de la boutique</h2>

        <table className="w-full min-w-[300px]">
          <thead>
            <tr className="text-left border-b">
              <th>ID Produit</th>
              <th>Quantité</th>
            </tr>
          </thead>

          <tbody>
            {stock.length > 0 ? (
              stock.map((s, i) => (
                <tr key={i} className="border-b">
                  <td>{s.ID_produit}</td>
                  <td>{s.Quantite}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-3 text-gray-500">
                  Aucun stock disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= COMMANDES ================= */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-3">Commandes récentes</h2>

        <ul className="space-y-2">
          {commandes.length > 0 ? (
            commandes.map((c) => (
              <li key={c.ID_commande} className="border p-2 rounded">
                Commande #{c.ID_commande} - {c.Statut}
              </li>
            ))
          ) : (
            <p className="text-gray-500">Aucune commande</p>
          )}
        </ul>
      </div>

      {/* ================= CLIENTS ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Clients</h2>

        <ul className="space-y-2">
          {clients.length > 0 ? (
            clients.map((c) => (
              <li key={c.ID_client} className="border p-2 rounded">
                {c.Nom} {c.Prenom}
              </li>
            ))
          ) : (
            <p className="text-gray-500">Aucun client</p>
          )}
        </ul>
      </div>

    </div>
  );
}

export default DashboardEmploye;