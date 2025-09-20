import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: process.env.PGHOST || "localhost",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "daraz12345",
    database: process.env.PGDATABASE || "postgres",
    port: Number(process.env.PGPORT) || 5432,
    ssl: { rejectUnauthorized: false },
  },
  pool: { min: 0, max: 10 },
});
export default db;
