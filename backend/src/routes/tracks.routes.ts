import express from "express";
import { addTrack, getTracks, deleteTrack } from "../services/tracks.service";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.json(tracks);
});

// ADD
router.post("/", async (req, res) => {
  const { id, url, title, description, cover, source } = req.body;
  const uid = "misha";

  if (!id || !url) {
    return res.status(400).json({ error: "Missing id or url" });
  }

  await addTrack(id, uid, url, title, description, cover, source);
  res.json({ success: true });
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deleted = await deleteTrack(id);

  if (!deleted) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({ success: true });
});

export default router;