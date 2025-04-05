const Address = require('../models/address');

exports.getAll = async (req, res) => {
    try {
        const addresses = await Address.getAll();
        res.json(addresses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newAddress = await Address.create(req.body);
        res.status(201).json(newAddress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedAddress = await Address.update(req.params.id, req.body);
        if (!updatedAddress) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.json(updatedAddress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Address.delete(req.params.id);
        res.json({ message: 'Address deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};