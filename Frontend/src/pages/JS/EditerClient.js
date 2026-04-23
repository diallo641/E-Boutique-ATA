import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useEditerClient = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Nom: "",
    Adresse: "",
    Telephone: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 1. Charger les infos du client (PRE-REMPLISSAGE)
  const fetchClient = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/clients/unclient/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFormData({
          Nom: data.client.Nom,
          Adresse: data.client.Adresse,
          Telephone: data.client.Telephone
        });
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      setMessage("Erreur chargement client");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [id]);

  // 🔥 changement input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 update client
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/clients/updateclient/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Client modifié avec succès ✅");

        setTimeout(() => {
          navigate("/Clients");
        }, 1500);

      } else {
        setMessage(result.message);
      }

    } catch (error) {
      setMessage("Erreur serveur");
    }
  };

  return {
    formData,
    message,
    loading,
    handleChange,
    handleSubmit
  };
};