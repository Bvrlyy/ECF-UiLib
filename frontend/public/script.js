// Fonction améliorée pour récupérer les composants
async function fetchComposants() {
  try {
    const response = await fetch("http://localhost:3000/api/composants"); // Ajout de /api/ dans l'URL

    if (!response.ok) {
      throw new Error("Erreur réseau");
    }

    const composants = await response.json(); // Parse la réponse en JSON
    displayComposants(composants); // Appelle la fonction pour afficher les composants
  } catch (error) {
    console.error("Erreur lors du fetch des composants :", error); // Gère les erreurs
  }
}

// Fonction pour afficher les composants dans le HTML
function displayComposants(composants) {
  const composantsList = document.getElementById("composants-list");
  const fragment = document.createDocumentFragment(); // Utilisation d'un document fragment pour améliorer les performances

  composants.forEach((composant) => {
    const composantDiv = document.createElement("div");
    composantDiv.classList.add("composant");
    composantDiv.dataset.id = composant.id;

    // Crée un label pour "Code :"
    const codeLabel = document.createElement("p");
    codeLabel.textContent = "Code :";

    // Crée un élément <pre> pour afficher le code avec des retours à la ligne
    const codeElement = document.createElement("pre");
    codeElement.textContent = composant.code;

    // Crée l'élément pour afficher le nom du composant et l'exemple
    const exampleElement = document.createElement("p");
    exampleElement.innerHTML = `Exemple : ${composant.exemple}`;

    // Crée les boutons modifier et supprimer
    const editButton = document.createElement("button");
    editButton.textContent = "Modifier";
    editButton.addEventListener("click", () => editComposant(composant.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => deleteComposant(composant.id));

    composantDiv.append(
      codeLabel,
      codeElement,
      exampleElement,
      editButton,
      deleteButton,
    );

    fragment.appendChild(composantDiv);
  });

  composantsList.innerHTML = ""; // Vide la liste avant d'ajouter les nouveaux composants
  composantsList.appendChild(fragment);
}

// Fonction pour modifier un composant
function editComposant(id) {
  const composantDiv = document.querySelector(`.composant[data-id='${id}']`);
  if (!composantDiv) return;

  const code = composantDiv.querySelector("pre")?.textContent || "";
  const exemple =
    composantDiv
      .querySelector("p:nth-of-type(2)")
      ?.textContent.replace("Exemple : ", "") || "";

  const codeInput = document.createElement("textarea");
  codeInput.value = code;

  const exempleInput = document.createElement("input");
  exempleInput.type = "text";
  exempleInput.value = exemple;

  const saveButton = document.createElement("button");
  saveButton.textContent = "Enregistrer";
  saveButton.addEventListener("click", async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/composants/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: codeInput.value,
            exemple: exempleInput.value,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Échec de la mise à jour");
      }

      fetchComposants();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du composant :", error);
    }
  });

  composantDiv.innerHTML = "";
  composantDiv.append(
    document.createElement("p").appendChild(document.createTextNode("Code :")),
    codeInput,
    document
      .createElement("p")
      .appendChild(document.createTextNode("Exemple :")),
    exempleInput,
    saveButton,
  );
}

async function fetchMethodologies() {
  try {
    const response = await fetch("http://localhost:3000/api/methodologies");

    if (!response.ok) {
      throw new Error("Erreur réseau");
    }

    const methodologies = await response.json();
    displayMethodologies(methodologies); // Afficher les méthodologies dans le menu déroulant
  } catch (error) {
    console.error("Erreur lors du fetch des méthodologies :", error);
  }
}

// Fonction pour afficher les méthodologies dans le menu déroulant
// Afficher les méthodologies dans le dropdown
function displayMethodologies(methodologies) {
  const methodoSelect = document.getElementById("methodo-select");
  methodoSelect.innerHTML = ""; // Vide le menu déroulant avant de rajouter les options

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Sélectionnez une méthodologie";
  methodoSelect.appendChild(defaultOption);

  methodologies.forEach((methodo) => {
    const option = document.createElement("option");
    option.value = methodo.id; // ID de la méthodologie comme valeur
    option.textContent = methodo.nom; // Nom de la méthodologie
    methodoSelect.appendChild(option);
  });
}

// Fonction améliorée pour récupérer les outils
async function fetchOutils() {
  try {
    const response = await fetch("http://localhost:3000/api/outils"); // URL pour récupérer les outils

    if (!response.ok) {
      throw new Error("Erreur réseau");
    }

    const outils = await response.json(); // Parse la réponse en JSON
    displayOutils(outils); // Appelle la fonction pour afficher les outils
  } catch (error) {
    console.error("Erreur lors du fetch des outils :", error); // Gère les erreurs
  }
}

// Fonction pour afficher les outils dans le HTML
function displayOutils(outils) {
  const outilsList = document.getElementById("outils-list");
  const fragment = document.createDocumentFragment(); // Utilisation d'un document fragment pour améliorer les performances

  outils.forEach((outil) => {
    const outilDiv = document.createElement("div");
    outilDiv.classList.add("outil");

    // Assurer que chaque outilDiv a un data-id pour l'identification
    outilDiv.dataset.id = outil.id; // <-- C'est ici que tu ajoutes l'attribut data-id

    const outilLabel = document.createElement("p");
    outilLabel.textContent = "Outil :";

    const outilCategorie = document.createElement("p");
    outilCategorie.innerHTML = `Categorie: ${outil.categorie}`;

    const outilLien = document.createElement("p");
    outilLien.innerHTML = `Lien : ${outil.lien}`;

    // Crée les boutons modifier et supprimer
    const editButton = document.createElement("button");
    editButton.textContent = "Modifier";
    editButton.addEventListener("click", () => editOutil(outil.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => deleteOutil(outil.id));

    outilDiv.append(
      outilLabel,
      outilCategorie,
      outilLien,
      editButton,
      deleteButton,
    );

    fragment.appendChild(outilDiv);
  });

  outilsList.innerHTML = ""; // Vide la liste avant d'ajouter les nouveaux outils
  outilsList.appendChild(fragment);
}

// Fonction pour modifier un outil
function editOutil(id) {
  const outilDiv = document.querySelector(`.outil[data-id='${id}']`);
  if (!outilDiv) {
    console.log("Outil non trouvé !");
    return; // Sort de la fonction si l'outil n'est pas trouvé
  }

  // Continue la logique de modification ici...

  const categorieText =
    outilDiv
      .querySelector("p:nth-of-type(2)")
      ?.textContent.replace("Categorie: ", "") || "";
  const lienText =
    outilDiv
      .querySelector("p:nth-of-type(3)")
      ?.textContent.replace("Lien : ", "") || "";

  const categorieInput = document.createElement("input");
  categorieInput.type = "text";
  categorieInput.value = categorieText;

  const lienInput = document.createElement("input");
  lienInput.type = "url";
  lienInput.value = lienText;

  const saveButton = document.createElement("button");
  saveButton.textContent = "Enregistrer";
  saveButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/outils/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categorie: categorieInput.value,
          lien: lienInput.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la mise à jour");
      }

      fetchOutils();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'outil :", error);
    }
  });

  outilDiv.innerHTML = "";
  const categorieLabel = document.createElement("p");
  categorieLabel.textContent = "Categorie :";
  const lienLabel = document.createElement("p");
  lienLabel.textContent = "Lien :";

  outilDiv.append(
    categorieLabel,
    categorieInput,
    lienLabel,
    lienInput,
    saveButton,
  );
}

// Fonction pour supprimer un outil
async function deleteOutil(id) {
  console.log(`Suppression de l'outil avec l'ID ${id}`);

  try {
    const response = await fetch(`http://localhost:3000/api/outils/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'outil");
    }

    console.log("Outil supprimé avec succès");

    // Actualiser la liste des outils après suppression
    fetchOutils();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'outil :", error);
  }
}

// Récupérer les composants associés à la méthodologie sélectionnée
document
  .getElementById("methodo-select")
  .addEventListener("change", function () {
    const methodologyId = this.value; // ID de la méthodologie sélectionnée

    if (methodologyId) {
      const url = `http://localhost:3000/api/methodologies/${methodologyId}/composants`; // URL dynamique
      fetch(url)
        .then((response) => response.json())
        .then((composants) => {
          const composantsContainer =
            document.getElementById("composants-list");
          composantsContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter de nouveaux composants

          const fragment = document.createDocumentFragment();

          composants.forEach((composant) => {
            const composantDiv = document.createElement("div");
            composantDiv.classList.add("composant");
            composantDiv.dataset.id = composant.id;

            const nomComposant = document.createElement("p");
            nomComposant.textContent = composant.nom;

            const codeLabel = document.createElement("p");
            codeLabel.textContent = "Code :";

            const codeElement = document.createElement("pre");
            codeElement.textContent = composant.code;

            const exampleElement = document.createElement("p");
            exampleElement.innerHTML = `Exemple : ${composant.exemple}`;

            const editButton = document.createElement("button");
            editButton.textContent = "Modifier";
            editButton.addEventListener("click", () =>
              editComposant(composant.id),
            );

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Supprimer";
            deleteButton.addEventListener("click", () =>
              deleteComposant(composant.id),
            );

            composantDiv.append(
              nomComposant,
              codeLabel,
              codeElement,
              exampleElement,
              editButton,
              deleteButton,
            );

            fragment.appendChild(composantDiv);
          });

          composantsContainer.appendChild(fragment);
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Une erreur est survenue lors de la récupération des composants.",
          );
        });
    } else {
      document.getElementById("composants-list").innerHTML = "";
    }
  });

// Récupérer les outils associés à la méthodologie sélectionnée
document
  .getElementById("methodo-select")
  .addEventListener("change", function () {
    const methodologyId = this.value; // ID de la méthodologie sélectionnée

    if (methodologyId) {
      const url = `http://localhost:3000/api/methodologies/${methodologyId}/outils`; // URL dynamique pour récupérer les outils
      fetch(url)
        .then((response) => response.json())
        .then((outils) => {
          const outilsContainer = document.getElementById("outils-list");
          outilsContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter de nouveaux outils

          const fragment = document.createDocumentFragment();

          outils.forEach((outil) => {
            const outilDiv = document.createElement("div");
            outilDiv.classList.add("outil");

            const outilLabel = document.createElement("p");
            outilLabel.textContent = "Outil :";

            const outilCategorie = document.createElement("p");
            outilCategorie.innerHTML = `Categorie: ${outil.categorie}`;

            const outilLien = document.createElement("p");
            outilLien.innerHTML = `Lien : ${outil.lien}`;

            const editButton = document.createElement("button");
            editButton.textContent = "Modifier";
            editButton.addEventListener("click", () => {
              console.log("Bouton Modifier cliqué pour l'outil ID:", outil.id);
              editOutil(outil.id);
            });
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Supprimer";
            deleteButton.addEventListener("click", () => deleteOutil(outil.id));

            outilDiv.append(
              outilLabel,
              outilCategorie,
              outilLien,
              editButton,
              deleteButton,
            );

            fragment.appendChild(outilDiv);
          });

          outilsContainer.appendChild(fragment);
        })
        .catch((error) => {
          console.error(error);
          alert("Une erreur est survenue lors de la récupération des outils.");
        });
    } else {
      document.getElementById("outils-list").innerHTML = "";
    }
  });

// Appel des fonctions au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  fetchComposants();
  fetchOutils();
  fetchMethodologies();
});

// Fonction pour modifier une méthodologie
function editMethodo(id) {
  console.log(`Modification de la méthodologie avec l'ID ${id}`);
  // Logique de modification à ajouter
}

// Fonction pour supprimer une méthodologie
async function deleteMethodo(id) {
  console.log(`Suppression de la méthodologie avec l'ID ${id}`);

  try {
    const response = await fetch(
      `http://localhost:3000/api/methodologies/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la méthodologie");
    }

    console.log("Méthodologie supprimée avec succès");

    // Actualiser la liste des méthodologies après suppression
    fetchMethodologies();
  } catch (error) {
    console.error("Erreur lors de la suppression de la méthodologie :", error);
  }
}

// Appel des fonctions au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  fetchComposants();
  fetchMethodologies();
});

// Gestionnaire d’événement pour le formulaire d'ajout de composant
document
  .getElementById("ajout-composant-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom-composant").value.trim();
    const code = document.getElementById("code-composant").value.trim();
    const exemple = document.getElementById("exemple-composant").value.trim();

    try {
      const response = await fetch("http://localhost:3000/api/composants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, code, exemple }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du composant");
      }

      // Réinitialise le formulaire
      this.reset();

      // Recharge les composants
      fetchComposants();
    } catch (error) {
      console.error("Erreur lors de l'ajout du composant :", error);
      alert("Une erreur est survenue lors de l'ajout du composant.");
    }
  });

// Gestionnaire d’événement pour le formulaire d'ajout d'outil
document
  .getElementById("ajout-outil-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom-outil").value.trim();
    const categorie = document.getElementById("categorie-outil").value.trim();
    const lien = document.getElementById("lien-outil").value.trim();

    try {
      const response = await fetch("http://localhost:3000/api/outils", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, categorie, lien }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'outil");
      }

      // Réinitialise le formulaire
      this.reset();

      // Recharge la liste des outils
      fetchOutils();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'outil :", error);
      alert("Une erreur est survenue lors de l'ajout de l'outil.");
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");

  if (userName) {
    document.getElementById("user-name").textContent = userName;
  } else {
    document.getElementById("user-name").textContent = "Invité"; // Par défaut si pas de connexion
  }
});
