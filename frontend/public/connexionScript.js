document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error("Erreur réseau : " + text);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Stocke les informations de l'utilisateur dans le localStorage
          localStorage.setItem("userName", data.prenom); // Ici, tu récupères le prénom du backend
          window.location.href = "/index.html"; // Redirige vers la page d'accueil
        } else {
          alert("Email ou mot de passe incorrect");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error.message);
        alert("Erreur : " + error.message);
      });
  });
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
