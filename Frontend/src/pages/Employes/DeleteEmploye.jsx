import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteEmploye } from "../JS/DeleteEmploye";

function DeleteEmploye() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    setLoading(true);

    const res = await deleteEmploye(id);

    setLoading(false);

    if (res.success) {
      setMessage(res.message);

      setTimeout(() => {
        navigate("/employes");
      }, 1500);
    } else {
      setMessage(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="bg-white p-6 rounded shadow w-full max-w-md text-center">

        <h2 className="text-xl font-bold mb-4 text-red-600">
          Supprimer Employé : {id}
        </h2>

        <p className="mb-6 text-gray-700">
          Êtes-vous sûr de vouloir supprimer cet employé ?
          <br />
          Cette action est irréversible.
        </p>

        {message && (
          <p className="mb-4 text-sm text-gray-600">
            {message}
          </p>
        )}

        <div className="flex justify-between">

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Annuler
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            {loading ? "Suppression..." : "Supprimer"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteEmploye;