import express from "express";
import db from "../database.js";

const router = express.Router();

// Get all available times
router.get("/", async (req, res) => {
  try {
    const result = await db("available_time").select("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Add available time
router.post("/", async (req, res) => {
  try {
    const { user_id, volunteer_id, service_id, date } = req.body;
    const [result] = await db("available_time")
      .insert({ user_id, volunteer_id, service_id, date })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
