import HeaderAdmin from "../../composants/HeaderDashboard";
import { useEditerClient } from "../JS/EditerClient";
import { Link } from "react-router-dom";

function EditerClient() {

  const {
    formData,
    message,
    loading,
    handleChange,
    handleSubmit
  } = useEditerClient();

  if (loading) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded shadow">

        {/* Titre */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Modifier un client
        </h2>

        {/* Message */}
        {message && (
          <p className="text-center mb-4 text-sm text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nom */}
          <div>
            <label className="block mb-1 font-medium">Nom</label>
            <input
              type="text"
              name="Nom"
              value={formData.Nom}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Adresse */}
          <div>
            <label className="block mb-1 font-medium">Adresse</label>
            <input
              type="text"
              name="Adresse"
              value={formData.Adresse}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block mb-1 font-medium">Téléphone</label>
            <input
              type="text"
              name="Telephone"
              value={formData.Telephone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Bouton submit */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
          >
            Modifier
          </button>

        </form>

        {/* Bouton retour en bas */}
        <div className="mt-6 text-center">
          <Link
            to="/Clients"
            className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            ← Retour à la liste
          </Link>
        </div>

      </div>

    </div>
  );
}

export default EditerClient;