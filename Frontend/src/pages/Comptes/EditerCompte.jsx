import HeaderAdmin from "../../composants/HeaderDashboard";
import { useEditerCompte } from "../JS/EditerCompte";
import { Link } from "react-router-dom";

function EditerCompte() {

  const {
    formulaire,
    chargement,
    message,
    gererChangement,
    soumettreModification
  } = useEditerCompte();

  if (chargement) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded shadow">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Modifier compte
          </h2>

          <Link
            to="/Comptes"
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Retour
          </Link>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center mb-4 text-gray-700">
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={soumettreModification} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            name="Email"
            value={formulaire.Email}
            onChange={gererChangement}
            className="w-full px-4 py-2 border rounded"
            placeholder="Email"
          />

          {/* Mot de passe */}
          <input
            type="password"
            name="Mot_de_passe"
            value={formulaire.Mot_de_passe}
            onChange={gererChangement}
            className="w-full px-4 py-2 border rounded"
            placeholder="Nouveau mot de passe (optionnel)"
          />

          {/* Rôle */}
          <select
            name="ID_role"
            value={formulaire.ID_role}
            onChange={gererChangement}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">-- Choisir un rôle --</option>
            <option value="1">Admin</option>
            <option value="2">Manager</option>
            <option value="3">Employé</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            Modifier le compte
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditerCompte;