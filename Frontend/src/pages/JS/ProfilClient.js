import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useProfilClient = () => {

  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClient = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/clients/unclient/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setClient(data.client);
      } else {
        setClient(null);
      }

    } catch (error) {
      console.error(error);
      setClient(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [id]);

  return {
    client,
    loading
  };
};