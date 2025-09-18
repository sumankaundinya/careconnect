import express from "express";
import db from "../database.js";
import jwt from "jsonwebtoken";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const volunteer = await db("volunteers")
      .where({ user_id: payload.id })
      .first();

    if (!volunteer)
      return res.status(404).json({ error: "Volunteer not found" });

    res.json(volunteer);
  } catch (err) {
    console.error("Error in GET /api/me:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { name, email, phone_nr, address, post_nr, routine, photo, gender } =
      req.body;

    const result = await db("volunteers")
      .where({ user_id: payload.id })
      .update({
        name,
        email,
        phone_nr,
        address,
        post_nr,
        routine,
        photo,
        gender,
      })
      .returning("*");

    if (!result.length)
      return res.status(404).json({ error: "Volunteer not found" });

    res.json(result[0]);
  } catch (err) {
    console.error("Error in PUT /api/me:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
