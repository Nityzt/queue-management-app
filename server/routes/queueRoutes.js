import express from "express";
import QueueEntry from "../models/QueueEntry.js";

export default (io) => {
  const router = express.Router();

  // GET all entries
  router.get("/", async (req, res) => {
    const entries = await QueueEntry.find().lean();
    const cleanEntries = entries.map(e => ({
      _id: e._id,
      name: e.name,
      studentId: e.studentId
    }));
    res.json(cleanEntries);
  });

  // POST new entry
  router.post("/", async (req, res) => {
    const { name, studentId } = req.body;
    if (!name || !studentId) {
      return res.status(400).json({ error: "Name and Student ID required" });
    }

    const newEntry = await QueueEntry.create({ name, studentId });

    const responseObj = {
      _id: newEntry._id,
      name: newEntry.name,
      studentId: newEntry.studentId
    };

    io.emit("queue-added", responseObj);
    res.status(201).json(responseObj);
  });

  // DELETE entry
  router.delete("/:id", async (req, res) => {
    await QueueEntry.findByIdAndDelete(req.params.id);
    io.emit("queue-deleted", req.params.id);
    res.json({ message: "Deleted" });
  });

  return router;
};
