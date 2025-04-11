import prisma from "../../prisma/config/prismaClient.js";

export const MethodologieRepository = {
  async findAll() {
    return await prisma.methodologie.findMany();
  },

  async findById(id) {
    return await prisma.methodologie.findUnique({ where: { id: Number(id) } });
  },

  async create(data) {
    return await prisma.methodologie.create({ data });
  },

  async update(id, data) {
    return await prisma.methodologie.update({
      where: { id: Number(id) },
      data,
    });
  },

  async remove(id) {
    try {
      return await prisma.methodologie.delete({ where: { id: Number(id) } });
    } catch (error) {
      console.error("Erreur dans MethodologieRepository.remove :", error);
      throw error;
    }
  },
};
