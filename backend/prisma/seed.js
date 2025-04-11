import prisma from "./config/prismaClient.js"; // Assure-toi que le chemin d'import est correct.
import fs from "fs";
import bcrypt from "bcrypt"; // Pour hasher les mots de passe
import dotenv from "dotenv";
await prisma.$connect();
console.log("Connecté à la base de données!");
dotenv.config();
// Charge les données du fichier JSON
const membresData = JSON.parse(fs.readFileSync("../data/membres.json", "utf8"));
const composantsData = JSON.parse(
  fs.readFileSync("../data/composant.json", "utf8"),
);
const methodologiesData = JSON.parse(
  fs.readFileSync("../data/methodologie.json", "utf8"),
);
const outilsData = JSON.parse(fs.readFileSync("../data/outil.json", "utf8"));
const outilMethodologieData = JSON.parse(
  fs.readFileSync("../data/outil_methodologie.json", "utf8"),
);
const composantMethodologieData = JSON.parse(
  fs.readFileSync("../data/composant_methodologie.json", "utf8"),
);

async function seed() {
  // Insérer les membres avec mot de passe hashé
  for (const membre of membresData) {
    const hashedPassword = await bcrypt.hash(membre.password, 10);

    const existingMembre = await prisma.membre.findFirst({
      where: { email: membre.email },
    });

    if (!existingMembre) {
      await prisma.membre.create({
        data: {
          email: membre.email,
          password: hashedPassword,
          nom: membre.nom,
          prenom: membre.prenom,
        },
      });
    } else {
      console.log(`Le membre avec l'email ${membre.email} existe déjà.`);
    }
  }

  // Insérer les méthodologies
  for (const methodology of methodologiesData) {
    const existingMethodology = await prisma.methodologie.findFirst({
      where: { nom: methodology.nom },
    });

    if (!existingMethodology) {
      await prisma.methodologie.create({
        data: {
          nom: methodology.nom,
          description: methodology.description,
          usages: methodology.usages.join(", "),
        },
      });
    } else {
      console.log(`La méthodologie ${methodology.nom} existe déjà.`);
    }
  }

  // Insérer les outils
  for (const outil of outilsData) {
    const existingOutil = await prisma.outil.findFirst({
      where: { nom: outil.nom },
    });

    if (!existingOutil) {
      await prisma.outil.create({
        data: {
          nom: outil.nom,
          categorie: outil.categorie,
          lien: outil.lien,
        },
      });
    } else {
      console.log(`L'outil ${outil.nom} existe déjà.`);
    }
  }

  // Insérer les composants
  for (const composant of composantsData) {
    const existingComposant = await prisma.composant.findFirst({
      where: { nom: composant.nom },
    });

    if (!existingComposant) {
      await prisma.composant.create({
        data: {
          nom: composant.nom,
          code: composant.code,
          exemple: composant.exemple,
        },
      });
    } else {
      console.log(`Le composant ${composant.nom} existe déjà.`);
    }
  }

  // Insérer les relations entre outils et méthodologies
  // Insérer les outils
  for (const outil of outilsData) {
    const existingOutil = await prisma.outil.findFirst({
      where: { nom: outil.nom }, // Vérifie si l'outil existe déjà
    });

    if (!existingOutil) {
      await prisma.outil.create({
        data: {
          nom: outil.nom,
          categorie: outil.categorie,
          lien: outil.lien,
        },
      });
    } else {
      console.log(`L'outil ${outil.nom} existe déjà.`);
    }
  }

  // Insérer les méthodologies
  for (const methodology of methodologiesData) {
    const existingMethodology = await prisma.methodologie.findFirst({
      where: { nom: methodology.nom }, // Vérifie si la méthodologie existe déjà
    });

    if (!existingMethodology) {
      await prisma.methodologie.create({
        data: {
          nom: methodology.nom,
          description: methodology.description,
          usages: methodology.usages.join(", "), // Transforme le tableau en chaîne de caractères
        },
      });
    } else {
      console.log(`La méthodologie ${methodology.nom} existe déjà.`);
    }
  }

  // Insérer les relations entre outils et méthodologies (après l'insertion des données)
  // Insérer les relations entre outils et méthodologies
  for (const relation of outilMethodologieData) {
    try {
      const existingOutil = await prisma.outil.findUnique({
        where: { id: relation.id_outil },
      });
      const existingMethodologie = await prisma.methodologie.findUnique({
        where: { id: relation.id_methodologie },
      });

      if (existingOutil && existingMethodologie) {
        const existingRelation = await prisma.outil_methodologie.findFirst({
          where: {
            id_outil: relation.id_outil,
            id_methodologie: relation.id_methodologie,
          },
        });

        if (!existingRelation) {
          await prisma.outil_methodologie.create({
            data: {
              id_outil: relation.id_outil,
              id_methodologie: relation.id_methodologie,
            },
          });
          console.log(
            `✅ Relation ajoutée : outil ${relation.id_outil} + méthodologie ${relation.id_methodologie}`,
          );
        } else {
          console.log(
            `⚠️ Déjà en BDD : outil ${relation.id_outil} + méthodologie ${relation.id_methodologie}`,
          );
        }
      } else {
        console.log(
          `❌ Outil ou méthodologie non trouvés : outil ${relation.id_outil}, méthodologie ${relation.id_methodologie}`,
        );
      }
    } catch (error) {
      console.error(
        `🔥 Erreur pour la relation ${relation.id_outil} + ${relation.id_methodologie} :`,
        error,
      );
    }
  }

  // Insérer les relations entre composants et méthodologies
  for (const relation of outilMethodologieData) {
    console.log(
      `Vérification de l'outil ${relation.id_outil} et de la méthodologie ${relation.id_methodologie}`,
    );

    const existingOutil = await prisma.outil.findFirst({
      where: { id: relation.id_outil },
    });
    const existingMethodologie = await prisma.methodologie.findFirst({
      where: { id: relation.id_methodologie },
    });

    if (existingOutil && existingMethodologie) {
      try {
        await prisma.outil_methodologie.create({
          data: {
            id_outil: relation.id_outil,
            id_methodologie: relation.id_methodologie,
          },
        });
        console.log(
          `✅ Relation ajoutée entre l'outil ${relation.id_outil} et la méthodologie ${relation.id_methodologie}`,
        );
      } catch (error) {
        if (
          error.code === "P2002" &&
          error.meta?.target?.includes("id_outil") &&
          error.meta?.target?.includes("id_methodologie")
        ) {
          console.log(
            `⚠️ La relation entre l'outil ${relation.id_outil} et la méthodologie ${relation.id_methodologie} existe déjà.`,
          );
        } else {
          console.error("🚨 Autre erreur :", error);
        }
      }
    } else {
      console.log(
        `❌ L'outil ${relation.id_outil} ou la méthodologie ${relation.id_methodologie} n'existent pas.`,
      );
    }
  }
  for (const relation of composantMethodologieData) {
    console.log(
      `Vérification du composant ${relation.id_composant} et de la méthodologie ${relation.id_methodologie}`,
    );

    const existingComposant = await prisma.composant.findFirst({
      where: { id: relation.id_composant },
    });
    const existingMethodologie = await prisma.methodologie.findFirst({
      where: { id: relation.id_methodologie },
    });

    console.log("Composant existant:", existingComposant);
    console.log("Méthodologie existante:", existingMethodologie);

    if (existingComposant && existingMethodologie) {
      const existingRelation = await prisma.composant_methodologie.findFirst({
        where: {
          id_composant: relation.id_composant,
          id_methodologie: relation.id_methodologie,
        },
      });

      if (!existingRelation) {
        await prisma.composant_methodologie.create({
          data: {
            id_composant: relation.id_composant,
            id_methodologie: relation.id_methodologie,
          },
        });
        console.log(
          `Relation ajoutée entre le composant ${relation.id_composant} et la méthodologie ${relation.id_methodologie}`,
        );
      } else {
        console.log(
          `La relation entre le composant ${relation.id_composant} et la méthodologie ${relation.id_methodologie} existe déjà.`,
        );
      }
    } else {
      console.log(
        `Le composant ${relation.id_composant} ou la méthodologie ${relation.id_methodologie} n'existent pas.`,
      );
    }
  }

  console.log("Données ajoutées avec succès !");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
