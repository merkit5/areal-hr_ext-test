const pool = require('../config/db');

class Organization {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM organization WHERE deleted_at IS NULL');
        return rows;
    }

    static async create({ name, comment }) {
        const { rows } = await pool.query(
            'INSERT INTO organization (name, comment) VALUES ($1, $2) RETURNING *',
            [name, comment]
        );
        return rows[0];
    }

    static async update(id, { name, comment }) {
        const { rows } = await pool.query(
            'UPDATE organization SET name = $1, comment = $2, updated_at = current_timestamp WHERE id = $3 RETURNING *',
            [name, comment, id]
        );
        return rows[0];
    }

    static async delete(id) {
        await pool.query('UPDATE organization SET deleted_at = current_timestamp WHERE id = $1', [id]);
        return { message: 'Organization deleted' };
    }
}

module.exports = Organization;
