import express from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not in .env file");
}

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sr_09",
  password: DB_PASSWORD,
  port: 5432,
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    if (!username || !password) {
      res.status(400).json("Invalid Credentials");
    }

    const registerQuery = await pool.query(
      `
        INSERT INTO users (username, email, password)
        VALUES($1, $2, $3)
        RETURNING id, username, email, created_at
        `,
      [username, email, passwordHash],
    );

    const response = registerQuery.rows[0];
    console.log("Response1: ", response.ok);
    if (response) {
      return res
        .status(200)
        .json({ message: "Registration Success", response });
    } else {
      return res.status(500).json({ message: "Registration failed" });
    }
  } catch (err) {
    console.error("Registration error", err);
    res.status(500).json({ message: "Registration failed", err });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginQuery = await pool.query(
      `
    SELECT * FROM users WHERE email = $1 
            `,
      [email],
    );

    if (loginQuery.rows.length === 0) {
      throw new Error("Invalid credentials");
    }

    const user = loginQuery.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        email: email,
      },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = loginQuery.rows[0];

    if (response) {
      res.status(200).json({ message: "login successful", token });
    } else {
      throw new Error("Login failed");
    }
  } catch (err) {
    console.error("Login Failed", err);
    res.status(401).json({ message: "login Failed", err });
  }
});

//app.post("/posts", async (req, res) => {});

//app.get("/posts", async (req, res) => {});

app.delete("/posts/:id", async (req, res) => {});

app.listen(3000, () => {
  console.log("Server is listneing on port 3000");
});
