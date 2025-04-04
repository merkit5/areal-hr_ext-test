const pool = require('../config/db');

class File {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM file');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM file WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ name, path, employee_id }) {
        const { rows } = await pool.query(
            'INSERT INTO file (name, path, employee_id) VALUES ($1, $2, $3) RETURNING *',
            [name, path, employee_id]
        );
        return rows[0];
    }

    static async update(id, { name, path, employee_id }) {
        const { rows } = await pool.query(
            'UPDATE file SET name = $1, path = $2, employee_id = $3, updated_at = current_timestamp WHERE id = $4 RETURNING *',
            [name, path, employee_id, id]
        );
        return rows[0];
    }


    static async delete(id) {
        await pool.query('DELETE FROM file WHERE id = $1', [id]);
        return { message: 'File deleted' };
    }
}

module.exports = File;
