import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 🔹 Récupérer une catégorie
export const getCategorieAPI = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/categories/getCategorieByID/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur récupération catégorie");
  }

  return data.categorie;
};

// 🔹 Supprimer catégorie
export const supprimerCategorieAPI = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/categories/deleteCategorie/${id}`,
    {
      method: "DELETE"
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur suppression"); // 🔥 IMPORTANT
  }

  return data;
};

// 🔥 Hook principal
export const useSupprimerCategorie = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [categorie, setCategorie] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  // 🔹 Charger catégorie
  useEffect(() => {
    const charger = async () => {
      try {
        const data = await getCategorieAPI(id);
        setCategorie(data);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setChargement(false);
      }
    };

    charger();
  }, [id]);

  // 🔹 Confirmer
  const confirmerSuppression = () => {
    setConfirmation(true);
  };

  // 🔹 Annuler
  const annulerSuppression = () => {
    setConfirmation(false);
  };

  // 🔥 Supprimer
  const supprimerCategorie = async () => {
    try {
      const result = await supprimerCategorieAPI(id);

      setMessage("✅ Catégorie supprimée avec succès");

      setTimeout(() => {
        navigate("/Categories");
      }, 1000);

    } catch (error) {
      // 🔥 ICI TU RECUPERES LE MESSAGE BACKEND
      setMessage(error.message);
    }
  };

  return {
    categorie,
    chargement,
    message,
    confirmation,
    confirmerSuppression,
    annulerSuppression,
    supprimerCategorie
  };
};