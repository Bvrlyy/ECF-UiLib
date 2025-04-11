import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Initialisation de PrismaClient

import { OutilRepository } from "../repositories/outilRepository.js";

export const OutilService = {
  async getAll() {
    return await OutilRepository.findAll();
  },

  async getOne(id) {
    return await OutilRepository.findById(id);
  },

  async create(data) {
    if (!data.nom || !data.categorie || !data.lien) {
      throw new Error("Champs requis manquants");
    }
    return await OutilRepository.create(data);
  },

  async update(id, data) {
    return await OutilRepository.update(id, data);
  },

  async deleteOutil(id) {
    const toolId = Number(id); // Convertir l'ID en nombre
    if (isNaN(toolId)) {
      throw new Error("ID invalide");
    }

    await prisma.outil_methodologie.deleteMany({
      where: { id_outil: toolId }, // Utilisation de l'ID converti
    });

    return await OutilRepository.remove(id);
  },

  async getByMethodology(methodologyId) {
    return await OutilRepository.findByMethodology(methodologyId);
  },
};
