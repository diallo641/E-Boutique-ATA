import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CommandeSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // si tu veux passer ID_commande plus tard
  const ID_commande = location.state?.ID_commande;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000); // 4s pour laisser le temps de lire

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded shadow text-center max-w-md w-full">

        <div className="text-green-600 text-5xl mb-4">
          ✅
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Commande enregistrée avec succès
        </h1>

        <p className="mt-3 text-gray-600">
          Merci pour votre commande. Elle a bien été prise en compte et sera traitée prochainement.
        </p>

        {ID_commande && (
          <p className="mt-3 text-sm text-gray-500">
            Référence : <span className="font-bold">#{ID_commande}</span>
          </p>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Retour à l'accueil
        </button>

        <p className="mt-4 text-xs text-gray-400">
          Redirection automatique dans quelques secondes...
        </p>

      </div>

    </div>
  );
}

export default CommandeSuccess;