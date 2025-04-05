const pool = require('../config/db');

class User {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM "user"');
        return rows;
    }

    static async create({ first_name, last_name, patronymic, login, password, role }) {
        const { rows } = await pool.query(
            'INSERT INTO "user" (first_name, last_name, patronymic, login, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, patronymic, login, password, role]
        );
        return rows[0];
    }

    static async update(id, { first_name, last_name, patronymic, login, password, role }) {
        const { rows } = await pool.query(
            'UPDATE "user" SET first_name = $1, last_name = $2, patronymic = $3, login = $4, password = $5, role = $6, updated_at = current_timestamp WHERE id = $7 RETURNING *',
            [first_name, last_name, patronymic, login, password, role, id]
        );
        return rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM "user" WHERE id = $1', [id]);
        return { message: 'User deleted' };
    }
}

module.exports = User;
