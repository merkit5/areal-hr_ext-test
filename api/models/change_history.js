const pool = require('../config/db');

class ChangeHistory {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM change_history');
        return rows;
    }

    static async create({ date = new Date(), object_type, object_id, changes, user_id }) {
        const { rows } = await pool.query(
            `INSERT INTO change_history (date, object_type, object_id, changes, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [date, object_type, object_id, changes, user_id]
        );
        return rows[0];
    }

    static async update(id, { changes }) {
        const { rows } = await pool.query(
            `UPDATE change_history SET changes = $1, date = current_timestamp WHERE id = $2 RETURNING *`,
            [changes, id]
        );
        return rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM change_history WHERE id = $1', [id]);
        return { message: 'Change history deleted' };
    }
}

module.exports = ChangeHistory;