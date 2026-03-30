export async function InscriptionForm() {
  const nom = document.getElementById("nom").value.trim();
  const adresse = document.getElementById("adresse").value.trim();
  const telephone = document.getElementById("telephone").value.trim();
  const email = document.getElementById("email").value.trim();
  const motdepasse = document.getElementById("motdepasse").value.trim();
  const confirmMotdepasse = document.getElementById("confirmMotdepasse").value.trim();

  const messageDiv = document.getElementById("message");

  if (!nom || !adresse || !telephone || !email || !motdepasse || !confirmMotdepasse) {
    messageDiv.innerHTML =
      '<p class="text-red-500">Veuillez remplir tous les champs</p>';
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/clients/inscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nom: nom,
        Adresse: adresse,
        Telephone: telephone,
        Email: email,
        Mot_de_passe: motdepasse,
        Confirm_Mot_de_passe: confirmMotdepasse,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      messageDiv.innerHTML =
        `<p class="text-red-500">${data.message}</p>`;
      return;
    }

    // succès
    messageDiv.innerHTML =
      '<p class="text-green-500">Inscription réussie ✅</p>';

    // redirection 
    setTimeout(() => {
      window.location.href = "/Connexion";
    }, 2000);

  } catch (error) {
    console.error(error);
    messageDiv.innerHTML =
      '<p class="text-red-500">Erreur serveur</p>';
  }
}