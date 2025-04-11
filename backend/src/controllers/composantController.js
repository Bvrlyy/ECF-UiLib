import { ComposantService } from "../services/composantService.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const ComposantController = {
  // Récupère tous les composants
  async getAll(req, res) {
    try {
      const composants = await ComposantService.getAll();
      res.json(composants);
    } catch (err) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  // Récupère un composant par son ID
  async getOne(req, res) {
    try {
      const composant = await ComposantService.getOne(req.params.id);
      if (!composant) {
        return res.status(404).json({ error: "Composant non trouvé" });
      }
      res.json(composant);
    } catch (err) {
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  // Crée un nouveau composant
  async create(req, res) {
    try {
      const newComposant = await ComposantService.createComposant(req.body);
      res.status(201).json(newComposant);
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message || "Erreur lors de la création" });
    }
  },

  // Met à jour un composant existant
  async update(req, res) {
    try {
      const updatedComposant = await ComposantService.updateComposant(
        req.params.id,
        req.body,
      );
      if (!updatedComposant) {
        return res.status(404).json({ error: "Composant non trouvé" });
      }
      res.json(updatedComposant);
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message || "Erreur lors de la mise à jour" });
    }
  },

  // Supprime un composant
  // composantController.js

  async remove(req, res) {
    const composantId = parseInt(req.params.id, 10); // Récupère l'ID du composant depuis les paramètres de la requête

    try {
      // Essaye de supprimer le composant
      await ComposantService.deleteComposant(composantId);

      // Si la suppression réussit, renvoie un message de succès
      res
        .status(200)
        .json({ message: `Composant ${composantId} supprimé avec succès` });
    } catch (err) {
      // En cas d'erreur, renvoie un message d'erreur
      res.status(500).json({ error: err.message });
    }
  },

  // Récupère les composants d'une méthodologie spécifique
  async getByMethodology(req, res) {
    const { methodologyId } = req.params;
    try {
      const composants = await ComposantService.getByMethodology(methodologyId);
      if (!composants || composants.length === 0) {
        return res
          .status(404)
          .json({ error: "Aucun composant trouvé pour cette méthodologie" });
      }
      res.json(composants);
    } catch (err) {
      console.error("Erreur détaillée:", err); // Ajoutez cette ligne
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },
};
