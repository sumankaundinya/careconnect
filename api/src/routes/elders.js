import express from "express";
import db from "../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db("elders").select("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db("elders").where({ id }).first();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone_nr,
      address,
      post_nr,
      service_id,
      photo,
      gender,
    } = req.body;
    const [result] = await db("elders")
      .insert({
        name,
        email,
        phone_nr,
        address,
        post_nr,
        service_id,
        photo,
        gender,
      })
      .returning("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    const [result] = await db("elders")
      .where({ id })
      .update(fields)
      .returning("*");

    if (!result) {
      return res.status(404).json({ error: "Elder not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db("elders").where({ id }).del();
    res.json({ message: "Elder deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
