import { OutilService } from "../services/outilService.js";

export const OutilController = {
  async getAll(req, res) {
    try {
      const outils = await OutilService.getAll();
      res.json(outils);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des outils" });
    }
  },

  async getOne(req, res) {
    try {
      const outil = await OutilService.getOne(req.params.id);
      if (!outil) return res.status(404).json({ error: "Outil non trouvé" });
      res.json(outil);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l’outil" });
    }
  },

  async create(req, res) {
    try {
      const newOutil = await OutilService.create(req.body);
      res.status(201).json(newOutil);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await OutilService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await OutilService.deleteOutil(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error("Erreur dans OutilController :", err.message);
      if (err.message === "Outil non trouvé") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },

  async getByMethodology(req, res) {
    const { methodologyId } = req.params;
    try {
      const outils = await OutilService.getByMethodology(methodologyId);
      if (!outils || outils.length === 0) {
        return res
          .status(404)
          .json({ error: "Aucun outil trouvé pour cette méthodologie" });
      }
      res.json(outils);
    } catch (err) {
      console.error("Erreur détaillée:", err);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },
};
