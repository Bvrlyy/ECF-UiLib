import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Initialisation de PrismaClient
import { ComposantRepository } from "../repositories/composantRepository.js";

export const ComposantService = {
  async getAll() {
    return await ComposantRepository.findAll();
  },

  async getOne(id) {
    return await ComposantRepository.findById(id);
  },

  async createComposant(data) {
    if (!data.nom || !data.code || !data.exemple) {
      throw new Error("Champs requis manquants");
    }
    return await ComposantRepository.create(data);
  },

  async updateComposant(id, data) {
    return await ComposantRepository.update(id, data);
  },

  async deleteComposant(id) {
    // Supprimer les enregistrements dans la table de jointure 'composant_methodologie'
    await prisma.composant_methodologie.deleteMany({
      where: { id_composant: id }, // Utiliser 'id' au lieu de 'composantId'
    });

    // Appel à la fonction de suppression du composant
    return await ComposantRepository.remove(id);
  },

  async getByMethodology(methodologyId) {
    return await ComposantRepository.findByMethodology(methodologyId);
  },
};
