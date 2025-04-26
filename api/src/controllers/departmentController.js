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

  static async getById(req, res) {
    const client = await pool.connect();
    try {
      const id = parseInt(req.params.id);
      const departments = await Department.getById(client, id);

      res.json(departments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getParents(req, res) {
    try {
      const parents = await Department.getParents();
      res.json(parents);
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
      await Department.delete(client, req.params.id, req.user.id);
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
