import prisma from "../../prisma/config/prismaClient.js";

export const ComposantRepository = {
  // Trouve tous les composants
  async findAll() {
    try {
      return await prisma.composant.findMany();
    } catch (error) {
      console.error("Erreur lors de la récupération des composants:", error);
      throw new Error("Impossible de récupérer les composants");
    }
  },

  // Trouve un composant par son ID
  async findById(id) {
    try {
      const composant = await prisma.composant.findUnique({
        where: { id: Number(id) },
      });
      if (!composant) {
        throw new Error("Composant non trouvé");
      }
      return composant;
    } catch (error) {
      console.error("Erreur lors de la récupération du composant:", error);
      throw error; // Laisse l'erreur être gérée plus haut dans la pile d'appel
    }
  },

  // Crée un nouveau composant
  async create(data) {
    try {
      return await prisma.composant.create({ data });
    } catch (error) {
      console.error("Erreur lors de la création du composant:", error);
      throw new Error("Impossible de créer le composant");
    }
  },

  // Met à jour un composant par son ID
  async update(id, data) {
    try {
      return await prisma.composant.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du composant:", error);
      throw new Error("Impossible de mettre à jour le composant");
    }
  },

  // Supprime un composant par son ID
  async remove(id) {
    try {
      return await prisma.composant.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du composant:", error);
      throw new Error("Impossible de supprimer le composant");
    }
  },

  // Trouve les composants d'une méthodologie spécifique
  async findByMethodology(methodologyId) {
    try {
      const result = await prisma.composant_methodologie.findMany({
        where: {
          id_methodologie: Number(methodologyId),
        },
        include: {
          composant: true,
        },
      });
      return result.map((relation) => relation.composant);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des composants pour cette méthodologie:",
        error,
      );
      throw new Error(
        "Impossible de récupérer les composants pour cette méthodologie",
      );
    }
  },
};
