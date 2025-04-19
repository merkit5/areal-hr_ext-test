const pool = require('../config/db');
const HROperations = require('../models/hr_operations');
const Department = require("../models/department");
const Organization = require("../models/organization");

class HROperationsController {
    static async getAll(req, res) {
        try {
            const operations = await HROperations.getAll();
            res.json(operations);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getById(req, res) {
        const client = await pool.connect();
        try {
            const id = parseInt(req.params.id);
            const hrOperations = await HROperations.getById(client, id);

            res.json(hrOperations);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    static async create(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const userId = req.user?.id || 1;
            const newOperation = await HROperations.create(client, req.body, userId);
            // const newOperation = await HROperations.create(client, req.body, req.user.id);
            await client.query('COMMIT');
            res.status(201).json(newOperation);
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
            const userId = req.user?.id || 1;
            const updatedOperation = await HROperations.update(client, req.params.id, req.body, userId);
            // const updatedOperation = await HROperations.update(client, req.params.id, req.body, req.user.id);
            if (!updatedOperation) {
                return res.status(404).json({ error: 'HR Operation not found' });
            }
            await client.query('COMMIT');
            res.json(updatedOperation);
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
            const userId = req.user?.id || 1;
            await HROperations.delete(client, req.params.id, userId);
            // await HROperations.delete(client, req.params.id, req.user.id);
            await client.query('COMMIT');
            res.json({ message: 'HR Operation deleted' });
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }
}

module.exports = HROperationsController;
