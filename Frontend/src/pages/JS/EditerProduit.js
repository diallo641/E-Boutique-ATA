import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =======================
// API PRODUIT
// =======================

// Récupérer produit
export const getProduitAPI = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/produits/unproduit/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur chargement produit");
  }

  return data.Produit;
};

// Modifier produit
export const modifierProduitAPI = async (id, produit) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/produits/modifierproduit/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(produit)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur modification produit");
  }

  return data;
};

// =======================
// API CATEGORIES
// =======================
export const getCategoriesAPI = async () => {
  const response = await fetch(
    "http://localhost:3000/api/categories/getAllCategories"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur catégories");
  }

  return data.categories;
};
// =======================
export const useEditerProduit = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formulaire, setFormulaire] = useState({
    Nom_produit: "",
    Prix: "",
    ID_categorie: ""
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [chargement, setChargement] = useState(true);

  // charger produit + categories
  useEffect(() => {

    const chargerDonnees = async () => {
      try {
        const [produit, cats] = await Promise.all([
          getProduitAPI(id),
          getCategoriesAPI()
        ]);

        setFormulaire({
          Nom_produit: produit.Nom_produit,
          Prix: produit.Prix,
          ID_categorie: produit.ID_categorie
        });

        setCategories(cats);

      } catch (error) {
        setMessage(error.message);
      } finally {
        setChargement(false);
      }
    };

    chargerDonnees();
  }, [id]);

  // changer input
  const gererChangement = (e) => {
    setFormulaire({
      ...formulaire,
      [e.target.name]: e.target.value
    });
  };

  // submit
  const soumettreFormulaire = async (e) => {
    e.preventDefault();

    try {
      await modifierProduitAPI(id, formulaire);

      setMessage("Produit modifié avec succès");

      setTimeout(() => {
        navigate("/Produits");
      }, 1000);

    } catch (error) {
      setMessage(error.message);
    }
  };

  return {
    formulaire,
    categories,
    message,
    chargement,
    gererChangement,
    soumettreFormulaire
  };
};