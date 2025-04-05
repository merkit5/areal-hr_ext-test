const ChangeHistory = require('../models/change_history');

exports.getAll = async (req, res) => {
    try {
        const history = await ChangeHistory.getAll();
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newEntry = await ChangeHistory.create(req.body);
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedEntry = await ChangeHistory.update(req.params.id, req.body);
        if (!updatedEntry) {
            return res.status(404).json({ error: 'History entry not found' });
        }
        res.json(updatedEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await ChangeHistory.delete(req.params.id);
        res.json({ message: 'History entry deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};