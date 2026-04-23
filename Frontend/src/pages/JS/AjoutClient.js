import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAjoutClient = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Nom: "",
    Adresse: "",
    Telephone: "",
    Email: "",
    Mot_de_passe: "",
    ID_role: 4,
    ID_boutique: ""
  });

  const [message, setMessage] = useState("");

  // 🔹 gérer les champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 appel API
  const ajouterClientAPI = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/clients/ajouterclient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, message: result.message };
      }

      return { success: true };

    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  //soumission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await ajouterClientAPI(formData);

    if (res.success) {
      setMessage("✅ Client ajouté avec succès");

      setTimeout(() => {
        navigate("/Clients");
      }, 1500);

    } else {
      setMessage("❌ " + res.message);
    }
  };

  return {
    formData,
    message,
    handleChange,
    handleSubmit
  };
};