import express from "express";
import db from "../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db("volunteers").select("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const volunteer = await db("volunteers").where({ id }).first();
    if (!volunteer)
      return res.status(404).json({ error: "Volunteer not found" });

    const services = await db("volunteer_services")
      .join("services", "volunteer_services.service_id", "services.id")
      .where("volunteer_services.volunteer_id", id)
      .select("services.description");
    volunteer.services = services.map((s) => s.description);

    const availability = await db("available_time")
      .join("services", "available_time.service_id", "services.id")
      .where("available_time.volunteer_id", id)
      .select(
        "available_time.available_from",
        "available_time.available_to",
        "services.description as service"
      );

    volunteer.availability = availability;

    const reviews = await db("reviews")
      .join("elders", "reviews.user_id", "elders.id")
      .where("reviews.volunteer_id", id)
      .select(
        "reviews.id",
        "elders.name as user",
        "reviews.description",
        "reviews.stars"
      );
    volunteer.reviews = reviews;

    res.json(volunteer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone_nr, address, post_nr, routine, photo, gender } =
      req.body;
    const [result] = await db("volunteers")
      .insert({
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
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_nr, address, post_nr, routine, photo, gender } =
      req.body;
    const result = await db.query(
      `UPDATE volunteers SET name=$1,email=$2,phone_nr=$3,address=$4,post_nr=$5,routine=$6,photo=$7,gender=$8
       WHERE id=$9 RETURNING *`,
      [name, email, phone_nr, address, post_nr, routine, photo, gender, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM volunteers WHERE id=$1", [id]);
    res.json({ message: "Volunteer deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
