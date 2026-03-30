// src/pages/JS/connexion.js

export async function ConnexionForm(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("motdepasse").value.trim();
  const messageDiv = document.getElementById("message");

  if (!email || !password) {
    messageDiv.innerHTML =
      '<p class="text-red-500">Veuillez remplir tous les champs.</p>';
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/authentification/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Mot_de_passe: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      messageDiv.innerHTML = `<p class="text-red-500">${data.message}</p>`;
      return;
    }

    // succès
    messageDiv.innerHTML =
      '<p class="text-green-500">Connexion réussie</p>';

    localStorage.setItem("token", data.token);

    const role = data.user.Nom_role;

    setTimeout(() => {
      if (role === "Admin") {
        window.location.href = "/Dashboardadmin";
      } else if (role === "Manager") {
        window.location.href = "/manager";
      } else {
        window.location.href = "/Dashboardadmin";
      }
    }, 2000);

  } catch (error) {
    console.error(error);
    messageDiv.innerHTML =
      '<p class="text-red-500">Erreur serveur</p>';
  }
}