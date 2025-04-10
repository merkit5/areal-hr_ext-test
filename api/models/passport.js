const pool = require('../config/db');
const ChangeHistory = require('./change_history');

class Passport {
    static async updateFull(client, employee_id, { series, number, issue_date, issuer_code, issuer }, userId) {
        const oldData = await this.getById(client, employee_id);
        const { rows } = await client.query(
            `UPDATE passport SET series = $1, number = $2, issue_date = $3, issuer_code = $4, issuer = $5, updated_at = current_timestamp WHERE employee_id = $6 RETURNING *`,
            [series, number, issue_date, issuer_code, issuer, employee_id]
        );
        const newData = rows[0];

        await ChangeHistory.logAction(client, {
            action: 'update',
            object_type: 'passport',
            object_id: newData.id,
            old_data: oldData,
            new_data: newData,
            user_id: userId
        });

        return newData;
    }

    static async deleteFull(client, employee_id, userId) {
        const oldData = await this.getById(client, employee_id);
        await client.query('DELETE FROM passport WHERE employee_id = $1', [employee_id]);

        await ChangeHistory.logAction(client, {
            action: 'delete',
            object_type: 'passport',
            object_id: oldData.id,
            old_data: oldData,
            new_data: null,
            user_id: userId
        });

        return { message: 'Passport deleted' };
    }

    static async create(client, { series, number, issue_date, issuer_code, issuer, employee_id }, userId) {
        const { rows } = await client.query(
            'INSERT INTO passport (series, number, issue_date, issuer_code, issuer, employee_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [series, number, issue_date, issuer_code, issuer, employee_id]
        );
        const newData = rows[0];

        await ChangeHistory.logAction(client, {
            action: 'create',
            object_type: 'passport',
            object_id: newData.id,
            old_data: null,
            new_data: newData,
            user_id: userId
        });

        return newData;
    }

    static async getById(client, employee_id) {
        const { rows } = await client.query(
            'SELECT * FROM passport WHERE employee_id = $1',
            [employee_id]
        );
        return rows[0];
    }
}

module.exports = Passport;
