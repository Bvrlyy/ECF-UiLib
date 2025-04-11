import express from "express";
import { ComposantController } from "../controllers/composantController.js";
import { MethodologieController } from "../controllers/methodologieController.js";
import { OutilController } from "../controllers/outilController.js";
import { MembreController } from "../controllers/membreController.js";
import { AuthController } from "../controllers/authController.js";

import cors from "cors";

// Crée une instance de express
const router = express.Router();

// Application de CORS pour autoriser le front-end à se connecter
router.use(cors());

// Définition des routes
// Routes ajustées
router.get("/composants", ComposantController.getAll);
router.get("/composants/:id", ComposantController.getOne);
router.post("/composants", ComposantController.create);
router.put("/composants/:id", ComposantController.update);
router.delete("/composants/:id", ComposantController.remove);
router.get(
  "/methodologies/:methodologyId/composants",
  ComposantController.getByMethodology,
);

router.get("/methodologies", MethodologieController.getAll);
router.get("/methodologies/:id", MethodologieController.getOne);
router.post("/methodologies", MethodologieController.create);
router.put("/methodologies/:id", MethodologieController.update);
router.delete("/methodologies/:id", MethodologieController.remove);

router.get("/outils", OutilController.getAll);
router.get("/outils/:id", OutilController.getOne);
router.post("/outils", OutilController.create);
router.put("/outils/:id", OutilController.update);
router.delete("/outils/:id", OutilController.remove);
router.get(
  "/methodologies/:methodologyId/outils",
  OutilController.getByMethodology,
);

// Routes pour les membres
router.get("/membres", MembreController.getAll); // Récupérer tous les membres
router.get("/membres/:id", MembreController.getOne); // Récupérer un membre par ID
router.post("/membres", MembreController.create); // Créer un nouveau membre
router.put("/membres/:id", MembreController.update); // Mettre à jour un membre
router.delete("/membres/:id", MembreController.remove); // Supprimer un membre

// Route de connexion
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signUp);
export default router;
