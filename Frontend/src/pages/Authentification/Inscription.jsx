import Headers from "../../composants/Headers";
import { Link } from "react-router-dom";

function Inscription() {
  return (
    <div>
      {/* Section inscription */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-md">

          {/* titre */}
          <h2 className="text-2xl font-bold text-center mb-6">
            Créer un compte
          </h2>

          {/* formulaire */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* nom */}
            <div>
              <label className="block text-gray-700 mb-1">
                Nom complet
              </label>

              <input
                type="text"
                placeholder="Votre nom"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* adresse */}
            <div>
              <label className="block text-gray-700 mb-1">
                Adresse
              </label>

              <input
                type="text"
                placeholder="Votre adresse"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* téléphone */}
            <div>
              <label className="block text-gray-700 mb-1">
                Téléphone
              </label>

              <input
                type="text"
                placeholder="Votre numéro"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

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

            {/* confirmer mot de passe */}
            <div>
              <label className="block text-gray-700 mb-1">
                Confirmer mot de passe
              </label>

              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* bouton */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                S'inscrire
              </button>
            </div>

          </form>

          {/* lien connexion */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/Connexion"
              className="text-blue-500 font-medium hover:underline"
            >
              Se connecter
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Inscription;