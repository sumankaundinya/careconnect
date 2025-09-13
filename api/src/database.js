import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: process.env.PGHOST || "localhost",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "Shanaya@402",
    database: process.env.PGDATABASE || "careconnect",
    port: Number(process.env.PGPORT) || 5432,
  },
  pool: { min: 0, max: 10 },
});

export default db;
