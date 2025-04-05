const File = require('../models/file');

exports.getAll = async (req, res) => {
    try {
        const files = await File.getAll();
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newFile = await File.create(req.body);
        res.status(201).json(newFile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedFile = await File.update(req.params.id, req.body);
        if (!updatedFile) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.json(updatedFile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await File.delete(req.params.id);
        res.json({ message: 'File deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
