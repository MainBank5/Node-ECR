const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const app = express();
const PORT = 3000;
const cors = require("cors"); 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // ✅ Correct static folder path

// Serve HTML Frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // ✅ Updated to match new src location
});

// Get all items
app.get("/items", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM items");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new item
app.post("/items", async (req, res) => {
    try {
        const { name } = req.body;
        const result = await pool.query("INSERT INTO items (name) VALUES ($1) RETURNING *", [name]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
