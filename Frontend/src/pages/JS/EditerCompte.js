import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 🔥 API récupérer compte
export const recupererCompteAPI = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3000/api/comptes/uncompte/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur chargement compte");
    }

    return data;

  } catch (error) {
    console.error("Erreur recupererCompte:", error.message);
    return null;
  }
};

// 🔥 API modifier compte
export const modifierCompteAPI = async (id, donnees) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3000/api/comptes/editercompte/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donnees),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erreur modification compte");
    }

    return result;

  } catch (error) {
    console.error("Erreur modifierCompte:", error.message);
    return null;
  }
};


// 🔥 Hook édition compte
export const useEditerCompte = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState("");

  const [formulaire, setFormulaire] = useState({
    Email: "",
    Mot_de_passe: "",
    ID_role: ""
  });

  // 🔹 charger données compte
  useEffect(() => {
    const chargerCompte = async () => {
      const data = await recupererCompteAPI(id);

      if (data) {
        setFormulaire({
          Email: data.Email || "",
          Mot_de_passe: "",
          ID_role: data.ID_role || ""
        });
      }

      setChargement(false);
    };

    chargerCompte();
  }, [id]);

  // 🔹 input change
  const gererChangement = (e) => {
    setFormulaire({
      ...formulaire,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 submit update
  const soumettreModification = async (e) => {
    e.preventDefault();

    setMessage("");

    const result = await modifierCompteAPI(id, formulaire);

    if (result) {
      setMessage("Compte modifié avec succès");

      setTimeout(() => {
        navigate("/Comptes");
      }, 1000);

    } else {
      setMessage("Erreur lors de la modification");
    }
  };

  return {
    formulaire,
    chargement,
    message,
    gererChangement,
    soumettreModification
  };
};