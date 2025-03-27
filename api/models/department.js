const pool = require('../config/db');

class Department {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM department WHERE deleted_at IS NULL');
        return rows;
    }

    static async create({ name, comment, organization_id, parent_id }) {
        const { rows } = await pool.query(
            'INSERT INTO department (name, comment, organization_id, parent_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, comment, organization_id, parent_id]
        );
        return rows[0];
    }

    static async update(id, { name, comment, organization_id, parent_id }) {
        const { rows } = await pool.query(
            'UPDATE department SET name = $1, comment = $2, organization_id = $3, parent_id = $4, updated_at = current_timestamp WHERE id = $5 RETURNING *',
            [name, comment, organization_id, parent_id, id]
        );
        return rows[0];
    }

    static async delete(id) {
        await pool.query('UPDATE department SET deleted_at = current_timestamp WHERE id = $1', [id]);
        return { message: 'Department deleted' };
    }
}

module.exports = Department;
