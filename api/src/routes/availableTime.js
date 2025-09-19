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

// Add a new available time
router.post("/", async (req, res) => {
  try {
    const { volunteer_id, service_id, available_from, available_to } = req.body;
    if (new Date(available_to) <= new Date(available_from)) {
      return res
        .status(400)
        .json({ error: '"available_to" must be later than "available_from"' });
    }

    const [result] = await db("available_time")
      .insert({
        volunteer_id,
        service_id,
        available_from,
        available_to,
      })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Error inserting available_time:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Delete available time by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db("available_time").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ error: "Availability not found" });
    }

    res.json({ success: true, message: "Availability deleted" });
  } catch (err) {
    console.error("Error deleting available_time:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
