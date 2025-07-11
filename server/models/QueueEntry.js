const mongoose = require('mongoose');

const QueueEntrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentID: { type: String, required: true },
    status: {
        type: String,
        enum: ['waiting', 'being_served', 'done', 'cancelled'],
        default: 'waiting',
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Optional: Middleware to auto-update 'updatedAt'
QueueEntrySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('QueueEntry', QueueEntrySchema);