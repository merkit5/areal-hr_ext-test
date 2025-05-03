const pool = require('../config/db');
const ChangeHistory = require('../models/change_history');

class ChangeHistoryController {
  static async getAll(req, res) {
    const client = await pool.connect();
    try {
      const history = await ChangeHistory.getAll(client);

      for (const record of history) {
        const userData = await ChangeHistory.getUserData(client, record.user_id);
        record.user = userData;
      }

      res.json(history);
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  }
}

module.exports = ChangeHistoryController;
