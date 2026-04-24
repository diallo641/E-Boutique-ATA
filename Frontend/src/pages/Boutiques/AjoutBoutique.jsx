import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ajouterBoutique } from "../JS/BoutiqueAdmin";

function AjoutBoutique() {

  const [formData, setFormData] = useState({
    Nom_boutique: "",
    Email: "",
    Adresse: "",
    Telephone: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

    const res = await ajouterBoutique(formData);

    if (res && res.message === "Boutique créée avec succès") {

      setMessage("Boutique créée avec succès ✅");

      setFormData({
        Nom_boutique: "",
        Email: "",
        Adresse: "",
        Telephone: ""
      });

      setTimeout(() => {
        navigate("/BoutiqueAdmin");
      }, 1000);

    } else {
      setMessage(res?.message || "Erreur lors de l'ajout ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      {/* CARD */}
      <div className="bg-white w-full max-w-md rounded shadow p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">

          <h1 className="text-xl font-bold">
            Ajouter une Boutique
          </h1>

          {/* RETOUR DANS LA CARTE */}
          <Link to="/BoutiqueAdmin">
            <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
              Retour
            </button>
          </Link>

        </div>

        {/* MESSAGE */}
        {message && (
          <p className="mb-3 text-center text-sm font-medium text-green-600">
            {message}
          </p>
        )}

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="Nom_boutique"
            placeholder="Nom boutique"
            value={formData.Nom_boutique}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            type="text"
            name="Adresse"
            placeholder="Adresse"
            value={formData.Adresse}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <input
            type="text"
            name="Telephone"
            placeholder="Téléphone"
            value={formData.Telephone}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 w-full rounded hover:bg-green-600"
          >
            Ajouter
          </button>

        </form>

      </div>

    </div>
  );
}

export default AjoutBoutique;