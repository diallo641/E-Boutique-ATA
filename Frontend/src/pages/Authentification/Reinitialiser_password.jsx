import { Link } from "react-router-dom";

function Reinitialiser_password() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">

        {/* titre */}
        <h2 className="text-2xl font-bold text-center mb-4">
          Mot de passe oublié
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Entrez votre email pour recevoir un lien de réinitialisation.
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
              placeholder="Votre email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* bouton */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Envoyer le lien
          </button>

        </form>

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