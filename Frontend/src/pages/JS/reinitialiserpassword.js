
export const ReinitialiserForm = async () => {
    // Récupérer les champs et le message
    const emailInput = document.getElementById("reinit-email");
    const nouveauPwdInput = document.getElementById("reinit-nouveauMotdepasse");
    const confirmPwdInput = document.getElementById("reinit-confirmMotdepasse");
    const messageBox = document.getElementById("reinit-message");

    if (!emailInput || !nouveauPwdInput || !confirmPwdInput || !messageBox) return;

    const email = emailInput.value.trim();
    const nouveauMotdepasse = nouveauPwdInput.value.trim();
    const confirmMotdepasse = confirmPwdInput.value.trim();

    // Validation simple
    if (!email || !nouveauMotdepasse || !confirmMotdepasse) {
        messageBox.textContent = "Tous les champs sont obligatoires.";
        messageBox.style.color = "red";
        return;
    }

    if (nouveauMotdepasse !== confirmMotdepasse) {
        messageBox.textContent = "Les mots de passe ne correspondent pas.";
        messageBox.style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/comptes/reinitialiser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({

                   Email: email,
                   Nouveau_mot_de_passe: nouveauMotdepasse   // <-- ici, underscore comme le backend
})
        });

        const data = await response.json();

        if (response.ok) {
            messageBox.textContent = data.message || "Mot de passe réinitialisé avec succès !";
            messageBox.style.color = "green";

            // Vider les champs
            emailInput.value = "";
            nouveauPwdInput.value = "";
            confirmPwdInput.value = "";
        } else {
            messageBox.textContent = data.message || "Une erreur est survenue.";
            messageBox.style.color = "red";
        }

    } catch (error) {
        console.error(error);
        messageBox.textContent = "Impossible de contacter le serveur.";
        messageBox.style.color = "red";
    }
};