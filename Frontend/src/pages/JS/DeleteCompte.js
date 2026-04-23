import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 🔥 API GET COMPTE
export const getCompteAPI = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/comptes/uncompte/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Compte non trouvé");
  }

  return data;
};

// 🔥 API DELETE COMPTE
export const supprimerCompteAPI = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/comptes/deletecompte/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur suppression compte");
  }

  return data;
};

// 🔥 HOOK
export const useSupprimerCompte = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [compte, setCompte] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  // 🔹 charger compte
  useEffect(() => {
    const chargerCompte = async () => {
      try {
        const data = await getCompteAPI(id);
        setCompte(data); // ✅ correction ici
      } catch (error) {
        setMessage(error.message);
      } finally {
        setChargement(false);
      }
    };

    chargerCompte();
  }, [id]);

  // 🔹 afficher confirmation
  const confirmerSuppression = () => {
    setConfirmation(true);
  };

  // 🔹 annuler confirmation
  const annulerSuppression = () => {
    setConfirmation(false);
  };

  // 🔥 suppression réelle
  const supprimerCompte = async () => {
    try {
      await supprimerCompteAPI(id);

      setMessage("Compte supprimé avec succès");

      setTimeout(() => {
        navigate("/Comptes");
      }, 1000);

    } catch (error) {
      setMessage(error.message);
    }
  };

  return {
    compte,
    chargement,
    message,
    confirmation,
    confirmerSuppression,
    annulerSuppression,
    supprimerCompte
  };
};