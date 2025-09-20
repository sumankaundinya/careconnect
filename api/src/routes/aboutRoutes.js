import express from "express";
import { handleAboutForm } from "../controller/aboutController.js";

const router = express.Router();

// POST /api/about
router.post("/", handleAboutForm);

export default router;
