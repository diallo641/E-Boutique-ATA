import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ======================
// API CREATE PRODUIT
// ======================
export const creerProduitAPI = async (data) => {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/api/produits/ajouterproduit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erreur création produit");
    }

    return result;

  } catch (error) {
    console.error("creerProduitAPI:", error.message);
    return null;
  }
};

// ======================
// API CATEGORIES
// ======================
export const getCategoriesAPI = async () => {
  try {

    const response = await fetch(
      "http://localhost:3000/api/categories/getAllCategories"
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.categories;

  } catch (error) {
    console.error("getCategoriesAPI:", error.message);
    return [];
  }
};

// ======================
// HOOK AJOUT PRODUIT
// ======================
export const useAjoutProduit = () => {

  const navigate = useNavigate();

  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");

  const [categories, setCategories] = useState([]);

  const [formulaire, setFormulaire] = useState({
    Nom_produit: "",
    Prix: "",
    ID_categorie: ""
  });

  // ======================
  // CHARGER CATEGORIES
  // ======================
  useEffect(() => {
    const charger = async () => {
      const data = await getCategoriesAPI();
      setCategories(data);
    };

    charger();
  }, []);

  // ======================
  // INPUT CHANGE
  // ======================
  const gererChangement = (e) => {
    setFormulaire({
      ...formulaire,
      [e.target.name]: e.target.value
    });
  };

  // ======================
  // SUBMIT
  // ======================
  const soumettreFormulaire = async (e) => {
    e.preventDefault();

    setChargement(true);
    setMessage("");

    const result = await creerProduitAPI(formulaire);

    if (result) {
      setMessage("Produit créé avec succès");

      setTimeout(() => {
        navigate("/Produits");
      }, 1000);

    } else {
      setMessage("Erreur lors de la création");
    }

    setChargement(false);
  };

  return {
    formulaire,
    message,
    chargement,
    categories,
    gererChangement,
    soumettreFormulaire
  };
};