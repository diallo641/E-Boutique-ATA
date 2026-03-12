import Headers from "../../composants/Headers";
import { Link } from "react-router-dom";

function Connexion() {
  return (
    <div>

      {/* Header */}
      

      {/* Section connexion */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">

          {/* titre */}
          <h2 className="text-2xl font-bold text-center mb-6">
            Connexion à votre compte
          </h2>

          {/* formulaire */}
          <form className="space-y-4">

            {/* email */}
            <div>
              <label className="block text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Votre email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* mot de passe */}
            <div>
              <label className="block text-gray-700 mb-1">
                Mot de passe
              </label>

              <input
                type="password"
                placeholder="Votre mot de passe"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* bouton connexion */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Se connecter
            </button>

          </form>

          {/* mot de passe oublié */}
          <div className="text-right mt-2">
            <Link
              to="/Reinitialiser_password"
              className="text-sm text-blue-500 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* inscription */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <Link
              to="/Inscription"
              className="text-blue-500 font-medium hover:underline"
            >
              Créer un compte
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Connexion;