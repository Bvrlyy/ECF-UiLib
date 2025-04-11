import prisma from "../../prisma/config/prismaClient.js";

export const MembreRepository = {
  async findAll() {
    return await prisma.membre.findMany();
  },

  async findById(id) {
    return await prisma.membre.findUnique({ where: { id: Number(id) } });
  },

  async create(data) {
    return await prisma.membre.create({ data });
  },

  async update(id, data) {
    return await prisma.membre.update({
      where: { id: Number(id) },
      data,
    });
  },
  async findByEmail(email) {
    return await prisma.membre.findUnique({ where: { email } }); // Recherche par email
  },

  async remove(id) {
    try {
      return await prisma.membre.delete({ where: { id: Number(id) } });
    } catch (error) {
      console.error("Erreur dans MembreRepository.remove :", error);
      throw error;
    }
  },
};
