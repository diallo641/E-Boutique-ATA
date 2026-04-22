import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditerManagerForm, getManagerById } from "../JS/EditerManager";

function EditerManager() {

  const { id } = useParams();

  const [form, setForm] = useState({
    Nom: "",
    Prenom: "",
    Email: "",
    Telephone: "",
    Adresse: "",
    ID_boutique: "",
    ID_role: 2
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 charger manager
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const data = await getManagerById(id);

        if (data && data.manager) {
          const m = data.manager;

          setForm({
            Nom: m.Nom || "",
            Prenom: m.Prenom || "",
            Email: m.Email || "",
            Telephone: m.Telephone || "",
            Adresse: m.Adresse || "",
            ID_boutique: m.ID_boutique || "",
            ID_role: 2
          });
        }

      } catch (error) {
        setMessage("Erreur chargement manager");
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  // 🔹 handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 submit update
  const handleUpdate = async () => {
    const res = await EditerManagerForm(id, form);

    if (!res?.success) {
      setMessage(res?.message || "Erreur modification");
      return;
    }

    setMessage(res.message);

    setTimeout(() => {
      window.location.href = "/Manager";
    }, 1200);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="bg-white w-full max-w-2xl p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4 text-center">
          Modifier Manager : {id}
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            name="Nom"
            value={form.Nom}
            onChange={handleChange}
            placeholder="Nom"
            className="border p-2 rounded"
          />

          <input
            name="Prenom"
            value={form.Prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="border p-2 rounded"
          />

          <input
            name="Email"
            value={form.Email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />

          <input
            name="Telephone"
            value={form.Telephone}
            onChange={handleChange}
            placeholder="Téléphone"
            className="border p-2 rounded"
          />

          <input
            name="Adresse"
            value={form.Adresse}
            onChange={handleChange}
            placeholder="Adresse"
            className="border p-2 rounded md:col-span-2"
          />

          <select
            name="ID_boutique"
            value={form.ID_boutique}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Choisir boutique</option>
            <option value="1">Boutique 1</option>
            <option value="2">Boutique 2</option>
            <option value="3">Boutique 3</option>
            <option value="4">Boutique 4</option>
            <option value="5">Boutique 5</option>
            <option value="6">Boutique 6</option>
          </select>

          {/* hidden role */}
          <input type="hidden" name="ID_role" value={2} />

          {/* buttons */}
          <div className="md:col-span-2 flex justify-between mt-4">

            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Retour
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Modifier
            </button>

          </div>

        </form>

        {/* message */}
        {message && (
          <div className="text-center mt-3 text-sm text-red-500">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default EditerManager;