import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =======================
// API DELETE PRODUIT
// =======================
const supprimerProduitAPI = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/produits/supprimerproduit/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur suppression produit");
  }

  return data;
};

// =======================
// HOOK DELETE PRODUIT
// =======================
export const useDeleteProduit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produit, setProduit] = useState(null);
  const [message, setMessage] = useState("");
  const [chargement, setChargement] = useState(true);

  // charger produit
  useEffect(() => {
    const chargerProduit = async () => {
      try {
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
          throw new Error(data.message);
        }

        setProduit(data.Produit);

      } catch (error) {
        setMessage(error.message);
      } finally {
        setChargement(false);
      }
    };

    chargerProduit();
  }, [id]);

  // supprimer
  const supprimerProduit = async () => {
    try {
      await supprimerProduitAPI(id);

      setMessage("Produit supprimé avec succès");

      setTimeout(() => {
        navigate("/Produits");
      }, 1000);

    } catch (error) {
      setMessage(error.message);
    }
  };

  return {
    produit,
    message,
    chargement,
    supprimerProduit
  };
};