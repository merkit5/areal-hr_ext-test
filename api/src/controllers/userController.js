const pool = require('../config/db');
const User = require('../models/user');

class UserController {
  static async getAll(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    const client = await pool.connect();
    try {
      const id = parseInt(req.params.id);
      const user = await User.getById(client, id);

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const userId = req.user?.id || 1;
      const newUser = await User.create(client, req.body, userId);
      // const newUser = await User.create(client, req.body, req.user.id);
      await client.query('COMMIT');
      res.status(201).json(newUser);
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
      const updatedUser = await User.update(client, req.params.id, req.body, userId);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      await client.query('COMMIT');
      res.json(updatedUser);
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
      await User.delete(client, req.params.id, userId);
      // await User.delete(client, req.params.id, req.user.id);
      await client.query('COMMIT');
      res.json({ message: 'User deleted' });
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
}

module.exports = UserController;
