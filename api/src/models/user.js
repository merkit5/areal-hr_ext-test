const pool = require('../config/db');
const ChangeHistory = require('./change_history');
const argon2 = require('argon2');

class User {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM "user"');
    return rows;
  }

  static async create(client, { first_name, last_name, patronymic, login, password, role }, userId) {
    const hashedPassword = await argon2.hash(password);
    const { rows } = await client.query(
      'INSERT INTO "user" (first_name, last_name, patronymic, login, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [first_name, last_name, patronymic, login, hashedPassword, role]
    );
    const newData = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'user',
      object_id: newData.id,
      old_data: null,
      new_data: newData,
      user_id: userId,
    });

    return newData;
  }

  static async update(client, id, { first_name, last_name, patronymic, login, password, role }, userId) {
    const oldData = await this.getById(client, id);
    let hashedPassword = oldData.password;
    if (password) {
      hashedPassword = await argon2.hash(password);
    }
    const { rows } = await client.query(
      'UPDATE "user" SET first_name = $1, last_name = $2, patronymic = $3, login = $4, password = $5, role = $6, updated_at = current_timestamp WHERE id = $7 RETURNING *',
      [first_name, last_name, patronymic, login, hashedPassword, role, id]
    );
    const newData = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'user',
      object_id: id,
      old_data: oldData,
      new_data: newData,
      user_id: userId,
    });

    return newData;
  }

  static async delete(client, id, userId) {
    const oldData = await this.getById(client, id);
    await client.query('DELETE FROM "user" WHERE id = $1', [id]);

    await ChangeHistory.logAction(client, {
      object_type: 'user',
      object_id: id,
      old_data: oldData,
      new_data: null,
      user_id: userId,
    });

    return { message: 'User deleted' };
  }

  static async getById(client, id) {
    const { rows } = await client.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return rows[0];
  }

  static async getByLogin(client, login) {
    const { rows } = await client.query('SELECT * FROM "user" WHERE login = $1', [login]);
    return rows[0];
  }
}

module.exports = User;