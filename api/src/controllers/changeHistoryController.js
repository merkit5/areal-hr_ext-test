const pool = require('../config/db');
const ChangeHistory = require('../models/change_history');

class ChangeHistoryController {
    static async getAll(req, res) {
        const client = await pool.connect();
        try {
            const history = await ChangeHistory.getAll(client);
            res.json(history);
        } catch (err) {
            res.status(500).json({ error: err.message });
        } finally {
            client.release();
        }
    }
}

module.exports = ChangeHistoryController;
