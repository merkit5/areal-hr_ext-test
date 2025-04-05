const Passport = require('../models/passport');

exports.getAll = async (req, res) => {
    try {
        const passports = await Passport.getAll();
        res.json(passports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newPassport = await Passport.create(req.body);
        res.status(201).json(newPassport);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedPassport = await Passport.update(req.params.id, req.body);
        if (!updatedPassport) {
            return res.status(404).json({ error: 'Passport not found' });
        }
        res.json(updatedPassport);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Passport.delete(req.params.id);
        res.json({ message: 'Passport deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};