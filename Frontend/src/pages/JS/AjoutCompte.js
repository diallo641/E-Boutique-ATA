import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🔥 API création compte
export const ajouterCompteAPI = async (donnees) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/api/comptes/ajouter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donnees),
      }
    );

    const resultat = await response.json();

    if (!response.ok) {
      throw new Error(resultat.message || "Erreur création compte");
    }

    return resultat;

  } catch (error) {
    console.error("Erreur API ajouterCompte:", error.message);
    return null;
  }
};


// 🔥 Hook AjoutCompte
export const useAjoutCompte = () => {

  const navigate = useNavigate();

  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");

  const [formulaire, setFormulaire] = useState({
    Email: "",
    Mot_de_passe: "",
    ID_role: ""
  });

  // 🔹 gérer changement inputs
  const gererChangement = (e) => {
    setFormulaire({
      ...formulaire,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 envoyer formulaire
  const soumettreFormulaire = async (e) => {
    e.preventDefault();

    setChargement(true);
    setMessage("");

    const resultat = await ajouterCompteAPI(formulaire);

    if (resultat) {
      setMessage("Compte créé avec succès");

      setTimeout(() => {
        navigate("/Comptes");
      }, 1000);

    } else {
      setMessage("Erreur lors de la création du compte");
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