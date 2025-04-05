const pool = require('../config/db');

class Employee {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM employee WHERE deleted_at IS NULL');
        return rows;
    }

    static async create({ first_name, last_name, patronymic, birth_date }) {
        const { rows } = await pool.query(
            'INSERT INTO employee (first_name, last_name, patronymic, birth_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, patronymic, birth_date]
        );
        return rows[0];
    }

    static async update(id, { first_name, last_name, patronymic, birth_date }) {
        const { rows } = await pool.query(
            'UPDATE employee SET first_name = $1, last_name = $2, patronymic = $3, birth_date = $4, updated_at = current_timestamp WHERE id = $5 RETURNING *',
            [first_name, last_name, patronymic, birth_date, id]
        );
        return rows[0];
    }

    static async delete(id) {
        await pool.query('UPDATE employee SET deleted_at = current_timestamp WHERE id = $1', [id]);
        return { message: 'Employee deleted' };
    }
}

module.exports = Employee;
