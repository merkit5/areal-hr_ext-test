const pool = require('../config/db');
const ChangeHistory = require('./change_history');

class Address {
    static async updateFull(client, employee_id, { region, locality, street, house, building }, userId) {
        const oldData = await this.getById(client, employee_id);
        const { rows } = await client.query(
            'UPDATE address SET region = $1, locality = $2, street = $3, house = $4, building = $5, updated_at = current_timestamp WHERE employee_id = $6 AND deleted_at IS NULL RETURNING *',
            [region, locality, street, house, building, employee_id]
        );
        const newData = rows[0];

        await ChangeHistory.logAction(client, {
            object_type: 'address',
            object_id: newData.id,
            old_data: oldData,
            new_data: newData,
            user_id: userId
        });

        return newData;
    }

    static async deleteFull(client, employee_id, userId) {
        const oldData = await this.getById(client, employee_id);
        await client.query('UPDATE address SET deleted_at = current_timestamp WHERE employee_id = $1', [employee_id]);

        await ChangeHistory.logAction(client, {
            object_type: 'address',
            object_id: oldData.id,
            old_data: oldData,
            new_data: null,
            user_id: userId
        });

        return { message: 'Address deleted' };
    }

    static async create(client, { region, locality, street, house, building, employee_id }, userId) {
        const { rows } = await client.query(
            'INSERT INTO address (region, locality, street, house, building, employee_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [region, locality, street, house, building, employee_id]
        );
        const newData = rows[0];

        await ChangeHistory.logAction(client, {
            object_type: 'address',
            object_id: newData.id,
            old_data: null,
            new_data: newData,
            user_id: userId
        });

        return newData;
    }

    static async getById(client, employee_id) {
        const { rows } = await client.query(
            'SELECT * FROM address WHERE employee_id = $1 AND deleted_at IS NULL',
            [employee_id]
        );
        return rows[0];
    }
}

module.exports = Address;
