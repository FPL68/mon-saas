
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const stripe = new Stripe("sk_test_123");
const openai = new OpenAI({ apiKey: "test" });

// Fake DB
let users = [];

// REGISTER
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Wrong password" });
  }

  // 👉 TOKEN FAKE (simple pour commencer)
  const token = "token_" + email;

  res.json({
    message: "Login success",
    token,
    email
  });
});
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password });

  res.json({ message: "User created" });
});
// TEST
app.get("/", (req, res) => {
    res.send("API running 🚀");
});

app.listen(3001, () => {
    console.log("Backend running on port 3001");
});
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1h" });

  res.json({ token });
});