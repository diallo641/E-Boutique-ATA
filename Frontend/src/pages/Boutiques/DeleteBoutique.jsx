import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supprimerBoutique, getBoutiqueById } from "../JS/BoutiqueAdmin";
import HeaderAdmin from "../../composants/HeaderDashboard";

function DeleteBoutique() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [boutique, setBoutique] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBoutiqueById(id);

      if (res && res.boutique) {
        setBoutique(res.boutique);
      } else {
        setMessage(res?.message || "Boutique introuvable");
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette boutique ?");
    if (!confirmDelete) return;

    setDeleting(true);

    const res = await supprimerBoutique(id);

    if (res && res.message) {
      setMessage(res.message);

      setTimeout(() => {
        navigate("/BoutiqueAdmin");
      }, 1500);

    } else {
      setMessage(res?.message || "Erreur lors de la suppression");
    }

    setDeleting(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="p-6 max-w-2xl mx-auto">

        {loading && (
          <p className="text-center">Chargement...</p>
        )}

        {message && (
          <p className="text-center text-sm font-medium text-red-500 mb-4">
            {message}
          </p>
        )}

        {boutique && (
          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold mb-4 text-red-600 text-center">
              ⚠️ Suppression de la boutique
            </h2>

            <div className="space-y-2 mb-6">
              <p><strong>Nom :</strong> {boutique.Nom_boutique}</p>
              <p><strong>Email :</strong> {boutique.Email}</p>
              <p><strong>Adresse :</strong> {boutique.Adresse}</p>
              <p><strong>Téléphone :</strong> {boutique.Telephone}</p>
            </div>

            {/* ACTIONS CENTRÉES */}
            <div className="flex justify-center gap-4">

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-32 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {deleting ? "Suppression..." : "Supprimer"}
              </button>

              <Link to="/BoutiqueAdmin">
                <button className="w-32 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Annuler
                </button>
              </Link>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default DeleteBoutique;