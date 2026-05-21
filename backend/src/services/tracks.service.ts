import db from "../db";

export function addTrack(id: string, uid: string, url: string, title?: string, description?: string, cover?: string, source?: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR REPLACE INTO tracks (id, uid, url, title, description, cover, source) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, uid, url, title, description, cover, source],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
}

export function getTracks(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM tracks ORDER BY created_at DESC`,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

export function deleteTrack(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM tracks WHERE id = ?`,
      [id],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      }
    );
  });
}