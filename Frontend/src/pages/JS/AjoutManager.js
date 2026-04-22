export async function AjoutManagerForm() {

  const get = (id) => document.getElementById(id);

  const Nom = get("nom")?.value?.trim();
  const Prenom = get("prenom")?.value?.trim();
  const Email = get("email")?.value?.trim();
  const Adresse = get("adresse")?.value?.trim();
  const Telephone = get("telephone")?.value?.trim();
  const Motdepasse = get("motdepasse")?.value?.trim();
  const ID_boutique = get("ID_boutique")?.value;
  const ID_role = 2;

  if (!Nom || !Prenom || !Email || !Adresse || !Telephone || !Motdepasse || !ID_boutique) {
    alert("Tous les champs sont requis");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3000/api/managers/ajoutermanager", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({
        Nom,
        Prenom,
        Email,
        Adresse,
        Telephone,
        Motdepasse,
        ID_boutique,
        ID_role
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Manager créé avec succès ✅");
    window.location.href = "/Manager";

  } catch (error) {
    console.error(error);
    alert("Erreur serveur");
  }
}