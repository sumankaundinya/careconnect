import express from "express";
import db from "../database.js";

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const result = await db("services").select("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET service by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db("services").where({ id }).first();
    if (!result) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST new service
router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const [result] = await db("services")
      .insert({ description })
      .returning("*");
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// PUT update service
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const [result] = await db("services")
      .where({ id })
      .update({ description })
      .returning("*");

    if (result.rows.length === 0)
      if (!result) {
        return res.status(404).json({ error: "Service not found" });
      }

    res.json(result.rows[0]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const count = await db("services").where({ id }).del();

    if (result.rows.length === 0)
      if (count === 0) {
        return res.status(404).json({ error: "Service not found" });
      }

    res.json({
      message: "Service deleted successfully",
      deleted: result.rows[0],
    });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
