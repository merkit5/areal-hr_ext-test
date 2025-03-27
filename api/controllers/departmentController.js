const Department = require('../models/department');

exports.getAll = async (req, res) => {
    try {
        const departments = await Department.getAll();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newDepartment = await Department.create(req.body);
        res.status(201).json(newDepartment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedDepartment = await Department.update(req.params.id, req.body);
        if (!updatedDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json(updatedDepartment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Department.delete(req.params.id);
        res.json({ message: 'Department deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
