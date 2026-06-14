import db from "../db";

export function reserveWishlistItem(
  reservedBy: string,
  itemId: number
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO wishlist_reservations
      (item_id, reserved_by)
      VALUES (?, ?)
      `,
      [itemId, reservedBy],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
}

export function cancelWishlistReservation(
  itemId: number,
  reservedBy: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {

    console.log("DELETE START", itemId, reservedBy);

    db.run(
      `
      DELETE FROM wishlist_reservations
      WHERE item_id = ? AND reserved_by = ?
      `,
      [itemId, reservedBy],
      function (err) {

        console.log("DELETE CALLBACK");

        if (err) {
          console.error("SQLITE ERROR:", err);
          return reject(err);
        }

        console.log("CHANGES:", this.changes);

        resolve(this.changes > 0);
      }
    );
  });
}

export function getWishlistReservations(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM wishlist_reservations
      `,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}