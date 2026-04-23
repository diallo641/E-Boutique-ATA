import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 🔥 API récupérer catégorie
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

// 🔥 API modifier catégorie
export const updateCategorieAPI = async (id, data) => {
  const response = await fetch(
    `http://localhost:3000/api/categories/updateCategorie/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erreur modification catégorie");
  }

  return result;
};

// 🔥 Hook
export const useEditerCategorie = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formulaire, setFormulaire] = useState({
    Nom_categorie: "",
    Description: ""
  });

  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState("");

  // 🔹 charger catégorie
  useEffect(() => {
    const chargerCategorie = async () => {
      try {
        const data = await getCategorieAPI(id);

        setFormulaire({
          Nom_categorie: data.Nom_categorie || "",
          Description: data.Description || ""
        });

      } catch (error) {
        setMessage(error.message);
      } finally {
        setChargement(false);
      }
    };

    chargerCategorie();
  }, [id]);

  // 🔹 changer input
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

    try {
      await updateCategorieAPI(id, formulaire);

      setMessage("Catégorie modifiée avec succès");

      setTimeout(() => {
        navigate("/Categories");
      }, 1000);

    } catch (error) {
      setMessage(error.message);
    }

    setChargement(false);
  };

  return {
    formulaire,
    chargement,
    message,
    gererChangement,
    soumettreFormulaire
  };
};