const HROperations = require('../models/hr_operations');

exports.getAll = async (req, res) => {
    try {
        const operations = await HROperations.getAll();
        res.json(operations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newOperation = await HROperations.create(req.body);
        res.status(201).json(newOperation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedOperation = await HROperations.update(req.params.id, req.body);
        if (!updatedOperation) {
            return res.status(404).json({ error: 'HR Operation not found' });
        }
        res.json(updatedOperation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await HROperations.delete(req.params.id);
        res.json({ message: 'HR Operation deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};