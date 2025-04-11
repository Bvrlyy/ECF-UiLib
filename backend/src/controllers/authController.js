import { MembreRepository } from "../repositories/membreRepository.js"; // Assure-toi du bon chemin
import bcrypt from "bcryptjs";
import { MembreService } from "../services/membreService.js"; // Assure-toi que le chemin est correct
export const AuthController = {
  async login(req, res) {
    const { email, password } = req.body;

    console.log(`Tentative de connexion avec email: ${email}`); // Log pour débogage

    try {
      const membre = await MembreRepository.findByEmail(email);

      if (!membre) {
        console.log("Membre non trouvé"); // Log si le membre n'est pas trouvé
        return res
          .status(400)
          .json({ success: false, message: "Email incorrect" });
      }

      const isMatch = await bcrypt.compare(password, membre.password);
      if (!isMatch) {
        console.log("Mot de passe incorrect"); // Log si le mot de passe ne correspond pas
        return res
          .status(400)
          .json({ success: false, message: "Mot de passe incorrect" });
      }

      res.json({
        success: true,
        message: "Connexion réussie",
        prenom: membre.prenom, // Renvoi du prénom de l'utilisateur
        email: membre.email, // Renvoi de l'email de l'utilisateur
      });
    } catch (err) {
      console.error("Erreur serveur :", err); // Log détaillé de l'erreur serveur
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },
  async signUp(req, res) {
    console.log("Requête d'inscription reçue:", req.body);
    const { email, password, prenom } = req.body;

    try {
      // Vérifier si l'email existe déjà
      const existingMembre = await MembreService.authenticateUser(email);
      if (existingMembre) {
        return res
          .status(400)
          .json({ success: false, message: "Email déjà utilisé" });
      }

      // Créer un nouveau membre
      const newMembre = await MembreService.createMembre({
        email,
        password,
        prenom,
      });
      res
        .status(201)
        .json({ success: true, message: "Membre créé avec succès" });
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },
};
