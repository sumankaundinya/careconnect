import express from "express";
import db from "../database.js";

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const result = await db("reviews").select("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Add review
router.post("/", async (req, res) => {
  try {
    const { title, volunteer_id, description, stars, user_id } = req.body;
    const [result] = await db("reviews")
      .insert({ title, volunteer_id, description, stars, user_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
