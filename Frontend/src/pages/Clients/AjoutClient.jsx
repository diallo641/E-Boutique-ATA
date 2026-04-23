import HeaderAdmin from "../../composants/HeaderDashboard";
import { useAjoutClient } from "../JS/AjoutClient";
import { Link } from "react-router-dom";

function AjoutClient() {

  const {
    formData,
    message,
    handleChange,
    handleSubmit
  } = useAjoutClient();

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Ajouter un client
        </h2>

        {message && (
          <p className="text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="Nom"
            placeholder="Nom"
            value={formData.Nom}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="text"
            name="Adresse"
            placeholder="Adresse"
            value={formData.Adresse}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="text"
            name="Telephone"
            placeholder="Téléphone"
            value={formData.Telephone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="password"
            name="Mot_de_passe"
            placeholder="Mot de passe"
            value={formData.Mot_de_passe}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Ajouter
          </button>
          {/* retour */}
        <div className="mt-6 text-center">
          <Link
            to="/Clients"
            className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Retour à la liste
          </Link>
        </div>

        </form>
      </div>
      
    </div>
    
  );
}

export default AjoutClient;