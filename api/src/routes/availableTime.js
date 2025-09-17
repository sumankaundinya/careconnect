import express from "express";
import db from "../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db("available_time").select("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { volunteer_id, service_id, available_from, available_to } = req.body;

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

export default router;
