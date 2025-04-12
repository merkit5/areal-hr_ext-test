const pool = require('../config/db');
const ChangeHistory = require('./change_history');

class File {
    static async updateFull(client, employee_id, { name, path }, userId) {
        const oldData = await this.getById(client, employee_id);
        const { rows } = await client.query(
            'UPDATE file SET name = $1, path = $2, updated_at = current_timestamp WHERE employee_id = $3 RETURNING *',
            [name, path, employee_id]
        );
        const newData = rows[0];

        await ChangeHistory.logAction(client, {
            object_type: 'file',
            object_id: newData.id,
            old_data: oldData,
            new_data: newData,
            user_id: userId
        });

        return newData;
    }

    static async deleteFull(client, employee_id, userId) {
        const oldData = await this.getById(client, employee_id);
        await client.query('DELETE FROM file WHERE employee_id = $1', [employee_id]);

        await ChangeHistory.logAction(client, {
            object_type: 'file',
            object_id: oldData.id,
            old_data: oldData,
            new_data: null,
            user_id: userId
        });

        return { message: 'File deleted' };
    }

    static async create(client, { name, path, employee_id }, userId) {
        const { rows } = await client.query(
            'INSERT INTO file (name, path, employee_id) VALUES ($1, $2, $3) RETURNING *',
            [name, path, employee_id]
        );
        const newData = rows[0];

        await ChangeHistory.logAction(client, {
            object_type: 'file',
            object_id: newData.id,
            old_data: null,
            new_data: newData,
            user_id: userId
        });

        return newData;
    }

    static async getById(client, employee_id) {
        const { rows } = await client.query(
            'SELECT * FROM file WHERE employee_id = $1',
            [employee_id]
        );
        return rows[0];
    }
}

module.exports = File;
