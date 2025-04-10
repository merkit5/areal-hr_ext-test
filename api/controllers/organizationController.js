const pool = require('../config/db');
const Organization = require('../models/organization');

class OrganizationController {
    static async getAll(req, res) {
        try {
            const organizations = await Organization.getAll();
            res.json(organizations);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async create(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const newOrganization = await Organization.create(client, req.body, req.user.id);
            await client.query('COMMIT');
            res.status(201).json(newOrganization);
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }

    static async update(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const updatedOrganization = await Organization.update(client, req.params.id, req.body, req.user.id);
            if (!updatedOrganization) {
                return res.status(404).json({ error: 'Organization not found' });
            }
            await client.query('COMMIT');
            res.json(updatedOrganization);
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }

    static async delete(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await Organization.delete(client, req.params.id, req.user.id);
            await client.query('COMMIT');
            res.status(204).end();
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }
}

module.exports = OrganizationController;
