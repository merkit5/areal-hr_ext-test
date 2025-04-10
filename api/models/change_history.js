const pool = require('../config/db');

class ChangeHistory {
    static async logAction(client, { action, object_type, object_id, old_data, new_data, user_id }) {
        const { rows } = await client.query(
            'INSERT INTO change_history (date, action, object_type, object_id, old_data, new_data, user_id) VALUES (NOW(), $1, $2, $3, $4, $5, $6) RETURNING *',
            [action, object_type, object_id, old_data, new_data, user_id]
        );
        return rows[0];
    }

    static async getByObject(client, object_type, object_id) {
        const { rows } = await client.query(
            'SELECT * FROM change_history WHERE object_type = $1 AND object_id = $2 ORDER BY date DESC',
            [object_type, object_id]
        );
        return rows;
    }

    static async getAll(client) {
        const { rows } = await client.query(
            'SELECT * FROM change_history ORDER BY date DESC'
        );
        return rows;
    }
}

module.exports = ChangeHistory;
