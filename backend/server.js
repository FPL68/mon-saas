
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

const stripe =new
Stripe("sk_test_123")
const openai = new OpenAI({ apiKey: "test" });

// Fake DB
let users = [];

// REGISTER
app.post("/api/auth/register", async (req, res) => {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = {
        id: Date.now(),
        email,
        password: hashed
    };

    users.push(user);

    res.json({ message: "User created" });
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ token });
});

// TEST
app.get("/", (req, res) => {
    res.send("API running 🚀");
});

app.listen(3001, () => {
    console.log("Backend running on port 3001");
});