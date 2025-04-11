import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "node", // Utilisation de l'environnement Node pour les tests backend
    alias: {
      "@src": resolve(__dirname, "./src"), // Crée un alias pour faciliter les importations
    },
  },
});
