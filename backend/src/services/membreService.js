import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Initialisation de PrismaClient
import { MembreRepository } from "../repositories/membreRepository.js";
import bcrypt from "bcryptjs";

export const MembreService = {
  async getAll() {
    return await MembreRepository.findAll();
  },

  async getOne(id) {
    return await MembreRepository.findById(id);
  },

  async createMembre(data) {
    const { email, password, prenom } = data;

    if (!email || !password || !prenom) {
      throw new Error("Champs requis manquants");
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de rounds de hachage

    try {
      // Créer le membre dans la base de données
      const newMembre = await prisma.membre.create({
        data: {
          email,
          password: hashedPassword,
          prenom,
        },
      });
      return newMembre; // Retourne le membre créé
    } catch (error) {
      throw new Error(
        "Erreur lors de la création du membre : " + error.message,
      );
    }
  },

  // Autres méthodes...

  async updateMembre(id, data) {
    return await MembreRepository.update(id, data);
  },

  async deleteMembre(id) {
    // Supprimer les enregistrements dans d'autres tables de jointure, si nécessaire
    // Exemple :
    // await prisma.membre_other_relation.deleteMany({ where: { membreId: id } });

    // Appel à la fonction de suppression du membre
    return await MembreRepository.remove(id);
  },

  async authenticateUser(email, password) {
    const membre = await MembreRepository.findByEmail(email);
    if (!membre) return null;

    const isMatch = await bcrypt.compare(password, membre.password);
    return isMatch ? membre : null;
  },
};
