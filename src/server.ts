import doenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import { Pool } from "pg";
const app = express();
app.use(express.json());
doenv.config({ path: path.join(process.cwd(), ".env") });
const port = 5000;

// Connect Postgress
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});
// Crete DB Table
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        
        )
        `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id  SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed_at BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello NExt leveld developers!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
