import { getBoutiques } from "../JS/statisques";
import { useEffect, useState } from "react";
import { AjoutManagerForm } from "../JS/AjoutManager";

function AjoutManager() {

  const [boutiques, setBoutiques] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getBoutiques();
      setBoutiques(data);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-2xl p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Ajouter un Manager
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input id="nom" placeholder="Nom" className="border p-2 rounded" />
          <input id="prenom" placeholder="Prénom" className="border p-2 rounded" />
          <input id="email" placeholder="Email" className="border p-2 rounded" />
          <input id="telephone" placeholder="Téléphone" className="border p-2 rounded" />

          <input id="adresse" placeholder="Adresse" className="border p-2 rounded md:col-span-2" />
          <input id="motdepasse" type="password" placeholder="Mot de passe" className="border p-2 rounded md:col-span-2" />

          {/* boutique */}
          <select id="ID_boutique" className="border p-2 rounded">
            <option value="">-- Boutique --</option>
            {boutiques.map((b) => (
              <option key={b.ID_boutique} value={b.ID_boutique}>
                {b.Nom_boutique}
              </option>
            ))}
          </select>

          {/* role fixe */}
          <input type="hidden" id="ID_role" value="2" />

          <div className="md:col-span-2 flex justify-between mt-4">

            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Retour
            </button>

            {/* 🔥 ONCLICK SIMPLE COMME TON INSCRIPTION */}
            <button
              type="button"
              onClick={AjoutManagerForm}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Enregistrer
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AjoutManager;