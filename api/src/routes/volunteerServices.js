import express from "express";
import db from "../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db("volunteer_services").select("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { volunteer_id, service_id } = req.body;
    const [result] = await db("volunteer_services")
      .insert({ volunteer_id, service_id })
      .returning("*");
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.delete("/:volunteer_id/:service_id", async (req, res) => {
  try {
    const { volunteer_id, service_id } = req.params;
    const count = await db("volunteer_services")
      .where({ volunteer_id, service_id })
      .del();

    if (count === 0) {
      return res.status(404).json({ error: "Relation not found" });
    }
    res.status(200).json({ message: "Relation deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
