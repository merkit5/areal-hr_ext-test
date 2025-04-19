const pool = require('../config/db');
const Employee = require('../models/employee');
const multer = require('../middleware/upload');

class EmployeeController {
    static async getAll(req, res) {
        const client = await pool.connect();
        try {
            const employees = await Employee.getAll(client);
            res.json(employees);
        } catch (err) {
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }

    static async getByIdFull(req, res) {
        const client = await pool.connect();
        try {
            const employee = await Employee.getByIdFull(client, req.params.id);
            if (!employee) return res.status(404).json({ error: 'Employee not found' });
            res.json(employee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }

    static async createFull(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const parsedData = JSON.parse(req.body.data);
            const files = req.files.map(file => ({
                name: file.originalname,
                path: file.path
            }));
            parsedData.files = files;
            const userId = req.user?.id || 1;
            const newEmployee = await Employee.createFull(client, parsedData, userId);
            // const newEmployee = await Employee.createFull(client, req.body, req.user.id);
            await client.query('COMMIT');
            res.status(201).json(newEmployee);
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }

    static async updateFull(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const parsedData = JSON.parse(req.body.data);
            const files = req.files.map(file => ({
                name: file.originalname,
                path: file.path
            }));
            parsedData.files = files;
            const userId = req.user?.id || 1;
            const updatedEmployee = await Employee.updateFull(client, req.params.id,  parsedData, userId);
            // const updatedEmployee = await Employee.updateFull(client, req.params.id, req.body, req.user.id);
            await client.query('COMMIT');
            res.json(updatedEmployee);
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }

    static async deleteFull(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const userId = req.user?.id || 1;
            await Employee.deleteFull(client, req.params.id, userId);
            // await Employee.deleteFull(client, req.params.id, req.user.id);
            await client.query('COMMIT');
            res.json({ message: 'Employee deleted' });
        } catch (err) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }
}

module.exports = EmployeeController;
