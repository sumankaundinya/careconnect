import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../database.js";
import crypto from "crypto";

function generateToken(id, email, role) {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: "60m",
  });
}

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await db("User").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User with this email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const [newUser] = await db("User")
      .insert({
        id: crypto.randomUUID(),
        name,
        email,
        password: hashPassword,
        role,
      })
      .returning("*");

    await db("volunteers").insert({
      user_id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone_nr: "",
      address: "",
      routine: "",
      photo: "",
      gender: "",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: "Unable to register. Please try again later",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db("User").where({ email }).first();
    if (!user) {
      return res.status(401).json({ success: false, error: "User not found" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password" });
    }

    const accessToken = generateToken(user.id, user.email, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Unable to login. Try again" });
  }
};

export const logOut = async (req, res) => {
  res.json({
    success: true,
    message: "Logout successful",
  });
};
