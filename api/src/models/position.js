const pool = require('../config/db');
const ChangeHistory = require('./change_history');

class Position {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM position WHERE deleted_at IS NULL');
        return rows;
    }

    static async create(client, { name }, userId = 1) {
        const { rows } = await client.query(
            'INSERT INTO position (name) VALUES ($1) RETURNING *',
            [name]
        );
        const newData = rows[0];

        await ChangeHistory.logAction(client, {
            object_type: 'position',
            object_id: newData.id,
            old_data: null,
            new_data: newData,
            user_id: userId
        });

        return newData;
    }

    static async update(client, id, { name }, userId = 1) {
        const oldData = await this.getById(client, id);
        const { rows } = await client.query(
            'UPDATE position SET name = $1, updated_at = current_timestamp WHERE id = $2 RETURNING *',
            [name, id]
        );
        const newData = rows[0];

        await ChangeHistory.logAction(client, {
            object_type: 'position',
            object_id: id,
            old_data: oldData,
            new_data: newData,
            user_id: userId
        });

        return newData;
    }

    static async delete(client, id, userId = 1) {
        const oldData = await this.getById(client, id);
        await client.query('UPDATE position SET deleted_at = current_timestamp WHERE id = $1', [id]);

        await ChangeHistory.logAction(client, {
            object_type: 'position',
            object_id: id,
            old_data: oldData,
            new_data: null,
            user_id: userId
        });

        return { message: 'Position deleted' };
    }

    static async getById(client, id) {
        const { rows } = await client.query(
            'SELECT * FROM position WHERE id = $1 AND deleted_at IS NULL',
            [id]
        );
        return rows[0];
    }
}

module.exports = Position;
