import prisma from "../../prisma/config/prismaClient.js";

export const OutilRepository = {
  async findAll() {
    return await prisma.outil.findMany();
  },

  async findById(id) {
    return await prisma.outil.findUnique({ where: { id: Number(id) } });
  },

  async create(data) {
    return await prisma.outil.create({ data });
  },

  async update(id, data) {
    return await prisma.outil.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    try {
      return await prisma.outil.delete({ where: { id: Number(id) } });
    } catch (error) {
      console.error("Erreur dans OutilRepository.remove :", error);
      throw error;
    }
  },

  async findByMethodology(methodologyId) {
    try {
      const result = await prisma.outil_methodologie.findMany({
        where: {
          id_methodologie: Number(methodologyId),
        },
        include: {
          outil: true, // On inclut les outils liés à la méthodologie
        },
      });

      return result.map((relation) => relation.outil);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des outils pour cette méthodologie:",
        error,
      );
      throw new Error(
        "Impossible de récupérer les outils pour cette méthodologie",
      );
    }
  },
};
