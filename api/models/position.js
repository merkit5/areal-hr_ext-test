const pool = require('../config/db');

class Position {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM position WHERE deleted_at IS NULL');
        return rows;
    }

    static async create({ name }) {
        const { rows } = await pool.query(
            'INSERT INTO position (name) VALUES ($1) RETURNING *',
            [name]
        );
        return rows[0];
    }

    static async update(id, { name }) {
        const { rows } = await pool.query(
            'UPDATE position SET name = $1, updated_at = current_timestamp WHERE id = $2 RETURNING *',
            [name, id]
        );
        return rows[0];
    }

    static async delete(id) {
        await pool.query('UPDATE position SET deleted_at = current_timestamp WHERE id = $1', [id]);
        return { message: 'Position deleted' };
    }
}

module.exports = Position;
