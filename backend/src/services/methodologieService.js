import { MethodologieRepository } from "../repositories/methodologieRepository.js";

export const MethodologieService = {
  async getAll() {
    return await MethodologieRepository.findAll();
  },

  async getOne(id) {
    return await MethodologieRepository.findById(id);
  },

  async createMethodologie(data) {
    if (!data.nom || !data.description || !data.usages) {
      throw new Error("Champs requis manquants");
    }
    return await MethodologieRepository.create(data);
  },

  async updateMethodologie(id, data) {
    return await MethodologieRepository.update(id, data);
  },

  async deleteMethodologie(id) {
    console.log("Tentative de suppression ID :", id);
    const methodologie = await MethodologieRepository.findById(id);
    if (!methodologie) {
      console.log("Méthodologie non trouvée");
      throw new Error("Méthodologie non trouvée");
    }
    console.log("Méthodologie trouvée, suppression en cours...");
    return await MethodologieRepository.remove(id);
  },
};
