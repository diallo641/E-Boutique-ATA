import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


// 🔥 API suppression client
export const supprimerClientAPI = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3000/api/clients/supprimerclient/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur suppression client");
    }

    return data;

  } catch (error) {
    console.error("Erreur supprimerClientAPI :", error.message);
    return null;
  }
};


// 🔥 Hook logique suppression client
export const useSupprimerClient = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ action supprimer
  const confirmerSuppression = async () => {
    setChargement(true);
    setMessage("");

    const resultat = await supprimerClientAPI(id);

    if (resultat) {
      setMessage("Client supprimé avec succès");

      setTimeout(() => {
        navigate("/Clients");
      }, 1200);

    } else {
      setMessage("Erreur lors de la suppression du client");
    }

    setChargement(false);
  };

  // ❌ action annuler
  const annulerSuppression = () => {
    navigate("/Clients");
  };

  return {
    chargement,
    message,
    confirmerSuppression,
    annulerSuppression,
  };
};