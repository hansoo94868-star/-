const mongoose = require('mongoose');

const hangerStatusSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true },
    humidity: Number,
    weight: Number,
    timestamp: { type: Date, default: Date.now },
    uvc: Boolean,
    temperature: Number,
    doorOpen: Boolean,
    mode: String,
    heaterOn: Boolean,
    fanOn: Boolean,
    uvOn: Boolean
});

module.exports = mongoose.model('HangerStatus', hangerStatusSchema);