import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./tracks.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      uid TEXT NOT NULL,
      url TEXT NOT NULL,
      title TEXT,
      description TEXT,
      cover TEXT,
      source TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;