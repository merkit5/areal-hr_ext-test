const jwt = require('jsonwebtoken');
const User = require('../models/user');
const argon2 = require('argon2');
const pool = require('../config/db');

class AuthController {
  static async login(req, res) {
    const client = await pool.connect();
    try {
      const { login, password } = req.body;
      const user = await User.getByLogin(client, login);
      if (!user || !(await argon2.verify(user.password, password))) {
        return res.status(401).json({ error: 'Invalid login or password' });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      });
      res.json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }

  static async logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  }

  static async checkAuth(req, res) {
    const client = await pool.connect();
    try {
      const user = await User.getById(client, req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({
        authenticated: true,
        user: {
          name: user.first_name + ' ' + user.last_name,
          role: user.role
        },
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
}

module.exports = AuthController;
