import { MembreService } from "../services/membreService.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const MembreController = {
  // Récupère tous les membres
  async getAll(req, res) {
    try {
      const membres = await MembreService.getAll();
      res.json(membres);
    } catch (err) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  // Récupère un membre par son ID
  async getOne(req, res) {
    try {
      const membre = await MembreService.getOne(req.params.id);
      if (!membre) {
        return res.status(404).json({ error: "Membre non trouvé" });
      }
      res.json(membre);
    } catch (err) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  // Crée un nouveau membre
  async create(req, res) {
    try {
      const newMembre = await MembreService.createMembre(req.body);
      res.status(201).json(newMembre);
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message || "Erreur lors de la création" });
    }
  },

  // Met à jour un membre existant
  async update(req, res) {
    try {
      const updatedMembre = await MembreService.updateMembre(
        req.params.id,
        req.body,
      );
      if (!updatedMembre) {
        return res.status(404).json({ error: "Membre non trouvé" });
      }
      res.json(updatedMembre);
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message || "Erreur lors de la mise à jour" });
    }
  },

  // Supprime un membre
  async remove(req, res) {
    const membreId = parseInt(req.params.id, 10); // Récupère l'ID du membre depuis les paramètres de la requête

    try {
      // Essaye de supprimer le membre
      await MembreService.deleteMembre(membreId);

      // Si la suppression réussit, renvoie un message de succès
      res
        .status(200)
        .json({ message: `Membre ${membreId} supprimé avec succès` });
    } catch (err) {
      // En cas d'erreur, renvoie un message d'erreur
      res.status(500).json({ error: err.message });
    }
  },
};
