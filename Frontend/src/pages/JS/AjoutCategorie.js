import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🔥 API création catégorie
export const creerCategorieAPI = async (data) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/categories/ajoutercategorie",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erreur création catégorie");
    }

    return result;

  } catch (error) {
    console.error("Erreur API catégorie:", error.message);
    return null;
  }
};

// 🔥 Hook
export const useAjoutCategorie = () => {

  const navigate = useNavigate();

  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");

  const [formulaire, setFormulaire] = useState({
    Nom_categorie: "",
    Description: ""
  });

  // 🔹 changement input
  const gererChangement = (e) => {
    setFormulaire({
      ...formulaire,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 submit
  const soumettreFormulaire = async (e) => {
    e.preventDefault();

    setChargement(true);
    setMessage("");

    const result = await creerCategorieAPI(formulaire);

    if (result) {
      setMessage("Catégorie créée avec succès");

      setTimeout(() => {
        navigate("/Categories");
      }, 1000);

    } else {
      setMessage("Erreur lors de la création de la catégorie");
    }

    setChargement(false);
  };

  return {
    formulaire,
    message,
    chargement,
    gererChangement,
    soumettreFormulaire
  };
};