const pool = require('../config/db');
const ChangeHistory = require('./change_history');

class Organization {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM organization WHERE deleted_at IS NULL');
    return rows;
  }

  static async create(client, { name, comment }, userId) {
    const { rows } = await client.query(
      'INSERT INTO organization (name, comment) VALUES ($1, $2) RETURNING *',
      [name, comment]
    );
    const newData = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'organization',
      object_id: newData.id,
      old_data: null,
      new_data: newData,
      user_id: userId,
    });

    return newData;
  }

  static async update(client, id, { name, comment }, userId) {
    const oldData = await this.getById(client, id);
    const { rows } = await client.query(
      'UPDATE organization SET name = $1, comment = $2, updated_at = current_timestamp WHERE id = $3 RETURNING *',
      [name, comment, id]
    );
    const newData = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'organization',
      object_id: id,
      old_data: oldData,
      new_data: newData,
      user_id: userId,
    });

    return newData;
  }

  static async delete(client, id, userId) {
    const oldData = await this.getById(client, id);
    await client.query('UPDATE organization SET deleted_at = current_timestamp WHERE id = $1', [
      id,
    ]);

    await ChangeHistory.logAction(client, {
      object_type: 'organization',
      object_id: id,
      old_data: oldData,
      new_data: null,
      user_id: userId,
    });

    return { message: 'Organization deleted' };
  }

  static async getById(client, id) {
    const { rows } = await client.query(
      'SELECT * FROM organization WHERE id = $1 AND deleted_at IS NULL',
      [id]
    );
    return rows[0];
  }
}

module.exports = Organization;
