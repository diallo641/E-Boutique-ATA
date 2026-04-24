import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBoutiqueById, updateBoutique } from "../JS/BoutiqueAdmin";
import HeaderAdmin from "../../composants/HeaderDashboard";

function EditerBoutique() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Nom_boutique: "",
    Email: "",
    Adresse: "",
    Telephone: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Charger boutique (pré-remplissage)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBoutiqueById(id);

      if (data && data.boutique) {
        setFormData({
          Nom_boutique: data.boutique.Nom_boutique || "",
          Email: data.boutique.Email || "",
          Adresse: data.boutique.Adresse || "",
          Telephone: data.boutique.Telephone || ""
        });
      } else {
        setMessage(data?.message || "Boutique introuvable");
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  // 🔹 Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateBoutique(id, formData);

    if (res && res.message === "Boutique modifiée avec succès") {
      setMessage("Modification réussie ✅");

      setTimeout(() => {
        navigate("/BoutiqueAdmin");
      }, 1000);

    } else {
      setMessage(res?.message || "Erreur lors de la modification ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <HeaderAdmin />

      <div className="flex justify-center p-6">

        <div className="bg-white w-full max-w-md p-6 rounded shadow">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">

            <h1 className="text-xl font-bold">
              Modifier Boutique
            </h1>

            <Link to="/BoutiqueAdmin">
              <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                Retour
              </button>
            </Link>

          </div>

          {/* MESSAGE */}
          {message && (
            <p className="mb-3 text-center text-sm text-blue-600">
              {message}
            </p>
          )}

          {/* LOADING */}
          {loading ? (
            <p className="text-center">Chargement...</p>
          ) : (

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="text"
                name="Nom_boutique"
                value={formData.Nom_boutique}
                onChange={handleChange}
                placeholder="Nom boutique"
                className="border p-2 w-full rounded"
              />

              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 w-full rounded"
              />

              <input
                type="text"
                name="Adresse"
                value={formData.Adresse}
                onChange={handleChange}
                placeholder="Adresse"
                className="border p-2 w-full rounded"
              />

              <input
                type="text"
                name="Telephone"
                value={formData.Telephone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="border p-2 w-full rounded"
              />

              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 w-full rounded hover:bg-yellow-600"
              >
                Modifier
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}

export default EditerBoutique;