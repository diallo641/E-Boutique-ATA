import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getEmployeById,
  getBoutiques,
  getManagersByBoutique,
  updateEmploye
} from "../JS/EditerEmploye";

function EditerEmploye() {

  const { id } = useParams();

  const [form, setForm] = useState({
    Nom: "",
    Prenom: "",
    Email: "",
    Adresse: "",
    Telephone: "",
    Motdepasse: "",
    ID_boutique: "",
    ID_manager: ""
  });

  const [boutiques, setBoutiques] = useState([]);
  const [managers, setManagers] = useState([]);
  const [message, setMessage] = useState("");

  // 🔥 CHARGER EMPLOYE + BOUTIQUES
  useEffect(() => {
    const loadData = async () => {

      const res = await getEmployeById(id);
      console.log("API EMPLOYE =>", res);

      const emp = res; // ✅ IMPORTANT : ton API retourne directement l'objet

      if (emp) {
        setForm({
          Nom: emp.Nom || "",
          Prenom: emp.Prenom || "",
          Email: emp.Email || "", // ⚠️ si Email existe côté API sinon enlever
          Adresse: emp.Adresse || "",
          Telephone: emp.Telephone || "",
          Motdepasse: "",
          ID_boutique: emp.ID_boutique || "",
          ID_manager: emp.ID_manager || ""
        });
      }

      const b = await getBoutiques();
      setBoutiques(b);
    };

    loadData();
  }, [id]);

  // 🔥 CHARGER MANAGERS SELON BOUTIQUE
  useEffect(() => {
    const loadManagers = async () => {
      if (form.ID_boutique) {
        const m = await getManagersByBoutique(form.ID_boutique);
        setManagers(m);
      } else {
        setManagers([]);
      }
    };

    loadManagers();
  }, [form.ID_boutique]);

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 UPDATE
  const handleSubmit = async () => {
    const res = await updateEmploye(id, form);

    setMessage(res.message);

    if (res.success) {
      setTimeout(() => {
        window.location.href = "/employes";
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="bg-white w-full max-w-2xl p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4 text-center">
          Modifier Employé
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

          <input
            name="Motdepasse"
            type="password"
            value={form.Motdepasse}
            onChange={handleChange}
            placeholder="Nouveau mot de passe (optionnel)"
            className="border p-2 rounded md:col-span-2"
          />

          {/* BOUTIQUE */}
          <select
            name="ID_boutique"
            value={form.ID_boutique}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Choisir boutique</option>
            {boutiques.map((b) => (
              <option key={b.ID_boutique} value={b.ID_boutique}>
                {b.Nom_boutique}
              </option>
            ))}
          </select>

          {/* MANAGER */}
          <select
            name="ID_manager"
            value={form.ID_manager}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Choisir manager</option>
            {managers.map((m) => (
              <option key={m.ID_manager} value={m.ID_manager}>
                {m.Nom} {m.Prenom}
              </option>
            ))}
          </select>

        </div>

        <div className="flex justify-between mt-6">

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Retour
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Modifier
          </button>

        </div>

        {message && (
          <p className="text-center mt-4 text-blue-500">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default EditerEmploye;