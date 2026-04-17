import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deconnexion } from "../JS/deconnexion";

import {
  fetchClientData,
  updateProfile,
  formatDateFR
} from "../JS/statistiqueClient";

function DashboardClient() {
  const [client, setClient] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    Nom: "",
    Adresse: "",
    Telephone: "",
    Email: ""
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchClientData();
      if (data) {
        setClient(data.client);
        setCommandes(data.commandes);
        setFormData({
          Nom: data.client.Nom,
          Adresse: data.client.Adresse,
          Telephone: data.client.Telephone,
          Email: data.client.Email || ""
        });
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const updated = await updateProfile(formData);
      setClient(updated.client);
      setEditMode(false);
    } catch (error) {
      console.error("Erreur mise à jour profil :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 HEADER RESPONSIVE */}
      <header className="bg-white shadow p-4 flex justify-between items-center">

        <h1 className="text-lg md:text-xl font-bold">🛍️ Ma Boutique</h1>

        {/* Desktop */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/client/produits" className="text-blue-500">Produits</Link>
          <Link to="/Panier" className="text-blue-500">Panier</Link> 
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Déconnexion desktop */}
        <button
          onClick={deconnexion}
          className="hidden md:block px-3 py-1 bg-red-500 text-white rounded"
        >
          Déconnexion
        </button>
      </header>

      {/* 🔥 MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-3 space-y-2">
          <Link to="/client/produits" className="block text-blue-500">Produits</Link>
          <Link to="/Panier" className="block text-blue-500">Panier</Link>

          <button
            onClick={deconnexion}
            className="w-full mt-2 bg-red-500 text-white py-2 rounded"
          >
            Déconnexion
          </button>
        </div>
      )}

      <div className="p-4 md:p-6">

        {/* 🔹 PROFIL */}
        <h2 className="text-xl md:text-2xl font-bold mb-4">👤 Mon Profil</h2>

        {client ? (
          <div className="bg-white p-4 md:p-6 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">

            {!editMode ? (
              <>
                <div className="border p-3 rounded">
                  <p className="text-gray-500 text-sm">Nom</p>
                  <p>{client.Nom}</p>
                </div>

                <div className="border p-3 rounded">
                  <p className="text-gray-500 text-sm">Adresse</p>
                  <p>{client.Adresse}</p>
                </div>

                <div className="border p-3 rounded">
                  <p className="text-gray-500 text-sm">Téléphone</p>
                  <p>{client.Telephone}</p>
                </div>

                <div className="border p-3 rounded">
                  <p className="text-gray-500 text-sm">Email</p>
                  <p>{client.Email}</p>
                </div>

                <button
                  onClick={() => setEditMode(true)}
                  className="col-span-1 md:col-span-4 mt-4 bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto"
                >
                  Modifier Profil
                </button>
              </>
            ) : (
              <>
                {Object.keys(formData).map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    placeholder={key}
                  />
                ))}

                <div className="col-span-1 md:col-span-4 flex flex-col md:flex-row justify-end gap-2">
                  <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto">
                    Enregistrer
                  </button>
                  <button onClick={() => setEditMode(false)} className="bg-gray-300 px-4 py-2 rounded w-full md:w-auto">
                    Annuler
                  </button>
                </div>
              </>
            )}
          </div>
        ) : <p>Chargement...</p>}

        {/* 🔹 COMMANDES */}
        <h2 className="text-xl md:text-2xl font-bold mb-4">📦 Mes Commandes</h2>

        <div className="bg-white rounded shadow overflow-x-auto">

          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 md:px-4 py-2">ID</th>
                <th className="px-2 md:px-4 py-2">Total</th>
                <th className="px-2 md:px-4 py-2">Statut</th>
                <th className="px-2 md:px-4 py-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {commandes.length > 0 ? (
                commandes.map((cmd) => (
                  <tr key={cmd.ID_commande} className="text-center border-b">
                    <td className="px-2 md:px-4 py-2">{cmd.ID_commande}</td>
                    <td className="px-2 md:px-4 py-2">{cmd.Total} FCFA</td>
                    <td className="px-2 md:px-4 py-2">{cmd.Statut_commande}</td>
                    <td className="px-2 md:px-4 py-2">
                      {formatDateFR(cmd.Date_commande)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-500 text-center">
                    Aucune commande
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default DashboardClient;