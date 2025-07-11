import mongoose from 'mongoose';

const QueueEntrySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

export default mongoose.model('QueueEntry', QueueEntrySchema);
