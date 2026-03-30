import { Link } from "react-router-dom";
import { ReinitialiserForm } from "../JS/reinitialiserpassword";

function Reinitialiser_password() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">

        {/* titre */}
        <h2 className="text-2xl font-bold text-center mb-4">
          Mot de passe oublié
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Entrez votre email pour réinitialiser votre mot de passe.
        </p>

        {/* formulaire */}
        <form className="space-y-4">

          {/* email */}
          <div>
            <label className="block text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              id="reinit-email"
              placeholder="Votre email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* nouveau mot de passe */}
          <div>
            <label className="block text-gray-700 mb-1">
              Nouveau mot de passe
            </label>

            <input
              type="password"
              id="reinit-nouveauMotdepasse"
              placeholder="Nouveau mot de passe"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* confirmer mot de passe */}
          <div>
            <label className="block text-gray-700 mb-1">
              Confirmer mot de passe
            </label>

            <input
              type="password"
              id="reinit-confirmMotdepasse"
              placeholder="Confirmer le mot de passe"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* bouton */}
          <div>
            <button
              type="button"
              onClick={ReinitialiserForm}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Réinitialiser
            </button>
          </div>

        </form>

        {/* message */}
        <div id="reinit-message" className="mt-4 text-center"></div>

        {/* retour connexion */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Retour à la{" "}
          <Link
            to="/Connexion"
            className="text-blue-500 font-medium hover:underline"
          >
            connexion
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Reinitialiser_password;