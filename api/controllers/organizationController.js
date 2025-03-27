const Organization = require('../models/organization');

exports.getAll = async (req, res) => {
    try {
        const organizations = await Organization.getAll();
        res.json(organizations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const organization = await Organization.getById(req.params.id);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        res.json(organization);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newOrganization = await Organization.create(req.body);
        res.status(201).json(newOrganization);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedOrganization = await Organization.update(req.params.id, req.body);
        if (!updatedOrganization) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        res.json(updatedOrganization);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Organization.delete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};