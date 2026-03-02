import express from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";
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

app.post("/posts", async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!(userId && typeof userId === "string")) {
      return res.status(400).json({ message: "userId error" });
    }

    if (!(content && typeof content === "string" && content.length < 1000)) {
      return res.status(400).json({ message: "invalid post" });
    }

    //const postSchema = z.object({

    //})

    const postQuery = await pool.query(
      `
        INSERT INTO posts("userId", content)
        VALUES($1,$2)
        RETURNING "postId", "userId", content, created_at
        `,
      [userId, content],
    );

    const response = postQuery.rows[0];
    console.log("response: ", response);

    if (response) {
      res.status(200).json({ message: "post success", response });
    } else {
      res.status(500).json({ message: "post failed", response });
    }
  } catch (error) {
    console.error("post failed", error);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const fetchPostsQuery = await pool.query(`
      SELECT * FROM posts
    `);

    res.status(200).json({ message: "fetch success", fetchPostsQuery });
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ message: "fetch failed", err });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("PostId: ", id);
    const deleteQuery = await pool.query(
      `
      DELETE FROM posts WHERE "postId" = $1
  
    `,
      [id],
    );

    if (deleteQuery.rows.length === 0) {
      res.status(204).json({ message: "no post found" });
    }

    res.json({
      message: "successful delete",
      deletedPost: deleteQuery.rows[0],
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is listneing on port 3000");
});
