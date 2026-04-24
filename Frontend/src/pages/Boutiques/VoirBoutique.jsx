import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBoutiqueById } from "../JS/BoutiqueAdmin";
import HeaderAdmin from "../../composants/HeaderDashboard";

function VoirBoutique() {

  const { id } = useParams();

  const [boutique, setBoutique] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBoutique = async () => {
      const data = await getBoutiqueById(id);

      if (data && data.boutique) {
        setBoutique(data.boutique);
      } else {
        setMessage(data?.message || "Erreur chargement boutique");
      }

      setLoading(false);
    };

    fetchBoutique();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="p-6 flex justify-center">

        {/* CARD */}
        <div className="bg-white w-full max-w-xl rounded shadow p-6">

          {/* HEADER CARD */}
          <div className="flex justify-between items-center mb-6">

            <h1 className="text-xl font-bold">
              Détails de la boutique
            </h1>

            {/* RETOUR DANS LA CARTE */}
            <Link to="/BoutiqueAdmin">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Retour
              </button>
            </Link>

          </div>

          {/* LOADING */}
          {loading && (
            <p className="text-center">Chargement...</p>
          )}

          {/* ERREUR */}
          {message && (
            <p className="text-red-500 text-center">{message}</p>
          )}

          {/* CONTENU */}
          {boutique && (
            <div className="space-y-4">

              <div className="bg-gray-100 p-3 rounded">
                <span className="font-semibold">ID :</span> {boutique.ID_boutique}
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <span className="font-semibold">Nom :</span> {boutique.Nom_boutique}
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <span className="font-semibold">Email :</span> {boutique.Email}
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <span className="font-semibold">Adresse :</span> {boutique.Adresse}
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <span className="font-semibold">Téléphone :</span> {boutique.Telephone}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default VoirBoutique;