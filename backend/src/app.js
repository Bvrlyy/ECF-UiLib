import express from "express";
import methodologieRoutes from "./routes/methodologieRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/methodologies", methodologieRoutes);

export default app;
