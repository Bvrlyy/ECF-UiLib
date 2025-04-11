import { MethodologieService } from "../services/methodologieService.js";

export const MethodologieController = {
  async getAll(req, res) {
    try {
      const methodologies = await MethodologieService.getAll();
      res.json(methodologies);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des méthodologies" });
    }
  },

  async getOne(req, res) {
    try {
      const methodology = await MethodologieService.getOne(req.params.id);
      if (!methodology) return res.status(404).json({ error: "Non trouvé" });
      res.json(methodology);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la méthodologie" });
    }
  },

  async create(req, res) {
    try {
      // Correction : appeler la méthode `createMethodologie`
      const newMethodology = await MethodologieService.createMethodologie(
        req.body,
      );
      res.status(201).json(newMethodology);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await MethodologieService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await MethodologieService.deleteMethodologie(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error("Erreur dans controller :", err.message);
      if (err.message === "Méthodologie non trouvée") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },
};
