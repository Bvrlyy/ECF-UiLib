import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js"; // Assure-toi d'importer les bonnes routes

dotenv.config();

const app = express();

// Middleware CORS
app.use(cors());
app.use(express.json()); // Pour le parsing du JSON

// Utilisation des routes
app.use("/api", routes); // Utilise composantRoutes ici, pas 'routes'

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
