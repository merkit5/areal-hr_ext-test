const pool = require('../config/db');

class Passport {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM passport');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM passport WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ series, number, issue_date, issuer_code, issuer, employee_id }) {
        const { rows } = await pool.query(
            'INSERT INTO passport (series, number, issue_date, issuer_code, issuer, employee_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [series, number, issue_date, issuer_code, issuer, employee_id]
        );
        return rows[0];
    }

    static async update(id, { series, number, issue_date, issuer_code, issuer, employee_id }) {
        const { rows } = await pool.query(
            `UPDATE passport SET series = $1, number = $2, issue_date = $3, issuer_code = $4, issuer = $5, employee_id = $6, updated_at = current_timestamp WHERE id = $7 RETURNING *`,
            [series, number, issue_date, issuer_code, issuer, employee_id, id]
        );
        return rows[0];
    }


    static async delete(id) {
        await pool.query('DELETE FROM passport WHERE id = $1', [id]);
        return { message: 'Passport deleted' };
    }
}

module.exports = Passport;
