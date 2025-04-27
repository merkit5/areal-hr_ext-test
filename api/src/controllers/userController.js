const pool = require('../config/db');
const User = require('../models/user');

class UserController {
  static async getAll(req, res) {
    const client = await pool.connect();
    try {
      if (req.user.role === 'manager') {
        const user = await User.getById(client, req.user.id);
        return res.json([user]);
      }

      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }

  static async create(req, res) {
    const client = await pool.connect();
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await client.query('BEGIN');
      const newUser = await User.create(client, req.body, req.user.id);
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
      const id = parseInt(req.params.id);

      if (req.user.role !== 'admin' && req.user.id !== id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      if (req.user.role === 'manager' && req.body.role) {
        return res.status(403).json({ error: 'You cannot change your role' });
      }

      await client.query('BEGIN');
      const updatedUser = await User.update(client, id, req.body, req.user.id);
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

  static async getById(req, res) {
    const client = await pool.connect();
    try {
      const id = parseInt(req.params.id);
      const user = await User.getById(client, id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }


  static async delete(req, res) {
    const client = await pool.connect();
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await client.query('BEGIN');
      await User.delete(client, req.params.id, req.user.id);
      await client.query('COMMIT');
      res.json({ message: 'User deleted' });
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }

  static async getCurrentUser(req, res) {
    const client = await pool.connect();
    try {
      const user = await User.getById(client, req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }

  static async updateCurrentUser(req, res) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      if (req.user.role !== 'admin' && req.body.role) {
        delete req.body.role;
      }

      const updatedUser = await User.update(client, req.user.id, req.body, req.user.id);
      await client.query('COMMIT');
      res.json(updatedUser);
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
}

module.exports = UserController;