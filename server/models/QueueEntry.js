import mongoose from "mongoose";

const QueueEntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true }
});

export default mongoose.models.QueueEntry || mongoose.model("QueueEntry", QueueEntrySchema);
