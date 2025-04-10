const pool = require('../config/db');
const Department = require('../models/department');

class DepartmentController {
    static async getAll(req, res) {
        try {
            const departments = await Department.getAll();
            res.json(departments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async create(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const newDepartment = await Department.create(client, req.body, req.user.id);
            await client.query('COMMIT');
            res.status(201).json(newDepartment);
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
            const updatedDepartment = await Department.update(client, req.params.id, req.body, req.user.id);
            await client.query('COMMIT');
            res.json(updatedDepartment);
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
            const isDeleted = await Department.delete(client, req.params.id, req.user.id);
            if (!isDeleted) {
                return res.status(404).json({ error: 'Department not found' });
            }
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

module.exports = DepartmentController;
