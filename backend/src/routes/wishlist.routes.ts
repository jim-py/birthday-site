import express from "express";
import {
  reserveWishlistItem,
  cancelWishlistReservation,
  getWishlistReservations,
} from "../services/wishlist.service";

const router = express.Router();

router.get("/reservations", async (_, res) => {
  const reservations = await getWishlistReservations();

  res.json(reservations);
});

router.post("/reserve", async (req, res) => {
  try {
    const { reservedBy, itemId } = req.body;

    await reserveWishlistItem(reservedBy, itemId);

    res.json({ success: true });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
    });
  }
});

router.delete("/reserve", async (req, res) => {
  try {
    const { reservedBy, itemId } = req.body;

    const deleted = await cancelWishlistReservation(
      itemId,
      reservedBy
    );

    res.json({
      success: deleted,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
    });
  }
});

export default router;