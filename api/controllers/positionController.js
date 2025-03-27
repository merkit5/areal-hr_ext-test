const Position = require('../models/position');

exports.getAll = async (req, res) => {
    try {
        const positions = await Position.getAll();
        res.json(positions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newPosition = await Position.create(req.body);
        res.status(201).json(newPosition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedPosition = await Position.update(req.params.id, req.body);
        if (!updatedPosition) {
            return res.status(404).json({ error: 'Position not found' });
        }
        res.json(updatedPosition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Position.delete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
