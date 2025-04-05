const pool = require('../config/db');

class HROperations {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM hr_operations');
        return rows;
    }

    static async create({ operation_type, salary, date, employee_id, department_id, position_id }) {
        const { rows } = await pool.query(
            'INSERT INTO hr_operations (operation_type, salary, date, employee_id, department_id, position_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [operation_type, salary, date, employee_id, department_id, position_id]
        );
        return rows[0];
    }

    static async update(id, { operation_type, salary, date, employee_id, department_id, position_id }) {
        const { rows } = await pool.query(
            `UPDATE hr_operations SET operation_type = $1, salary = $2, date = $3, employee_id = $4, department_id = $5, position_id = $6, updated_at = current_timestamp WHERE id = $7 RETURNING *`,
            [operation_type, salary, date, employee_id, department_id, position_id, id]
        );
        return rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM hr_operations WHERE id = $1', [id]);
        return { message: 'HR Operation deleted' };
    }
}

module.exports = HROperations;
