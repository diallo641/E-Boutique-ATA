import React from "react";

function AjouterCommandeForm() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center">
        Ajouter une Commande
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Total */}
        <div>
          <label className="block text-gray-600 mb-1">Total (FCFA)</label>
          <input
            type="number"
            name="Total"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex: 15000"
          />
        </div>

        {/* Mode de paiement */}
        <div>
          <label className="block text-gray-600 mb-1">Mode de paiement</label>
          <select
            name="Mode_paiement"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choisir --</option>
            <option value="Cash">Cash</option>
            <option value="Carte">Carte</option>
            <option value="Mobile Money">Mobile Money</option>
          </select>
        </div>

        {/* Statut */}
        <div>
          <label className="block text-gray-600 mb-1">Statut</label>
          <select
            name="Statut_commande"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="En cours">En cours</option>
            <option value="Validée">Validée</option>
            <option value="Annulée">Annulée</option>
          </select>
        </div>

        {/* ID Client */}
        <div>
          <label className="block text-gray-600 mb-1">ID Client</label>
          <input
            type="number"
            name="ID_client"
            className="w-full p-2 border rounded bg-gray-100"
            placeholder="Automatique"
            disabled
          />
        </div>

        {/* ID Employé */}
        <div>
          <label className="block text-gray-600 mb-1">ID Employé</label>
          <input
            type="number"
            name="ID_employe"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex: 3"
          />
        </div>

        {/* ID Boutique */}
        <div>
          <label className="block text-gray-600 mb-1">ID Boutique</label>
          <input
            type="number"
            name="ID_boutique"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex: 1"
          />
        </div>

        {/* Boutons */}
        <div className="col-span-1 md:col-span-2 flex justify-end space-x-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

export default AjouterCommandeForm;