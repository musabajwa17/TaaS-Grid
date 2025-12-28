import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Minimal DB setup to satisfy template requirements, 
// but we will primarily use in-memory storage for this app as requested.
// If DATABASE_URL is not set, we'll just log a warning and export a dummy.

let db;
let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  console.warn("DATABASE_URL not set. Using mock DB.");
  db = {
    select: () => ({ from: () => [] }),
    insert: () => ({ values: () => ({ returning: () => [] }) }),
  };
}

export { db, pool };
