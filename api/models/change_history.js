const pool = require('../config/db');

class ChangeHistory {
    static async logAction(client, { object_type, object_id, old_data, new_data, user_id }) {
        const changes = {
            old: old_data,
            new: new_data
        };

        const { rows } = await client.query(
            `INSERT INTO change_history (date, object_type, object_id, changes, user_id)
             VALUES (NOW(), $1, $2, $3, $4)
             RETURNING *`,
            [object_type, object_id, changes, user_id]
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
