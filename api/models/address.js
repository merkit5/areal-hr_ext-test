const pool = require('../config/db');

class Address {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM address WHERE deleted_at IS NULL');
        return rows;
    }

    static async create({ region, locality, street, house, building, employee_id }) {
        const { rows } = await pool.query(
            'INSERT INTO address (region, locality, street, house, building, employee_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [region, locality, street, house, building, employee_id]
        );
        return rows[0];
    }

    static async update(id, { region, locality, street, house, building, employee_id }) {
        const { rows } = await pool.query(
            `UPDATE address SET region = $1, locality = $2, street = $3, house = $4, building = $5, employee_id = $6, updated_at = current_timestamp WHERE id = $7 RETURNING *`,
            [region, locality, street, house, building, employee_id, id]
        );
        return rows[0];
    }

    static async delete(id) {
        await pool.query('UPDATE address SET deleted_at = current_timestamp WHERE id = $1', [id]);
        return { message: 'Address deleted' };
    }
}

module.exports = Address;
