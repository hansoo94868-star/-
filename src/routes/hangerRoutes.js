const express = require('express');
const router = express.Router();
const HangerStatus = require('../models/HangerStatus');

// Sensor data transmission (POST)
router.post('/status', async (req, res) => {
    try {
        const { deviceId, humidity, temperature, weight, heaterOn, fanOn, uvOn, doorOpen, mode } = req.body;
        let hangerStatus = await HangerStatus.findOne({ deviceId });

        if (hangerStatus) {
            // Update existing status
            hangerStatus.humidity = humidity;
            hangerStatus.temperature = temperature;
            hangerStatus.weight = weight;
            hangerStatus.heaterOn = heaterOn;
            hangerStatus.fanOn = fanOn;
            hangerStatus.uvOn = uvOn;
            hangerStatus.doorOpen = doorOpen;
            hangerStatus.mode = mode;
            hangerStatus.timestamp = Date.now();
        } else {
            // Create new status
            hangerStatus = new HangerStatus({
                deviceId,
                humidity,
                temperature,
                weight,
                heaterOn,
                fanOn,
                uvOn,
                doorOpen,
                mode
            });
        }

        await hangerStatus.save();
        res.status(201).json(hangerStatus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Device status inquiry (GET)
router.get('/status/:deviceId', async (req, res) => {
    try {
        const status = await HangerStatus.findOne({ deviceId: req.params.deviceId });
        if (!status) return res.status(404).json({ message: 'Hanger status not found' });
        res.json(status);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Control command (POST/PUT) - Placeholder for future implementation
// router.post('/control/:deviceId', (req, res) => { /* ... */ });
// router.put('/control/:deviceId', (req, res) => { /* ... */ });

module.exports = router;