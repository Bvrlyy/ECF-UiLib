document
  .getElementById("sign-up-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const prenom = document.getElementById("prenom").value;

    console.log("Données envoyées:", { email, password, prenom }); // Vérifier les données avant l'envoi

    // Envoi de la requête vers le backend
    fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, prenom }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data); // Log pour vérifier la réponse
        if (data.success) {
          alert("Inscription réussie !");
          window.location.href = "/login.html"; // Redirige vers la page de connexion
        } else {
          alert(data.message); // Afficher le message d'erreur si l'inscription échoue
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur serveur");
      });
  });
