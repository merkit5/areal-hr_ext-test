const pool = require('../config/db');
const Position = require('../models/position');

class PositionController {
    static async getAll(req, res) {
        try {
            const positions = await Position.getAll();
            res.json(positions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getById(req, res) {
        const client = await pool.connect();
        try {
            const position = await Position.getById(client, req.params.id);
            res.json(position);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async create(req, res) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const newPosition = await Position.create(client, req.body);
            // const newPosition = await Position.create(client, req.body, req.user.id);
            await client.query('COMMIT');
            res.status(201).json(newPosition);
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
            const updatedPosition = await Position.update(client, req.params.id, req.body);
            // const updatedPosition = await Position.update(client, req.params.id, req.body, req.user.id);
            await client.query('COMMIT');
            res.json(updatedPosition);
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
            await Position.delete(client, req.params.id);
            // await Position.delete(client, req.params.id, req.user.id);
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

module.exports = PositionController;
