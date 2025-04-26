const pool = require('../config/db');
const ChangeHistory = require('./change_history');

class Department {
  static async getAll(client = pool) {
    const { rows } = await client.query('SELECT * FROM department WHERE deleted_at IS NULL');
    return rows;
  }

  static async create(client, { name, comment, organization_id, parent_id }, userId) {
    const { rows } = await client.query(
      'INSERT INTO department (name, comment, organization_id, parent_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, comment, organization_id, parent_id]
    );
    const newDepartment = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'department',
      object_id: newDepartment.id,
      old_data: null,
      new_data: newDepartment,
      user_id: userId,
    });

    return newDepartment;
  }

  static async getParents(client = pool) {
    const { rows } = await client.query(`
        SELECT id, name, organization_id FROM department WHERE deleted_at IS NULL`);
    return rows;
  }

  static async getById(client, id) {
    const { rows } = await client.query(
      'SELECT * FROM department WHERE id = $1 AND deleted_at IS NULL',
      [id]
    );
    return rows[0];
  }

  static async update(client, id, { name, comment, organization_id, parent_id }, userId) {
    const oldData = await this.getById(client, id);
    if (!oldData) throw new Error('Department not found');

    const { rows } = await client.query(
      `UPDATE department SET name = $1, comment = $2, organization_id = $3, parent_id = $4, updated_at = current_timestamp WHERE id = $5 AND deleted_at IS NULL RETURNING *`,
      [name, comment, organization_id, parent_id, id]
    );
    const updatedDepartment = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'department',
      object_id: id,
      old_data: oldData,
      new_data: updatedDepartment,
      user_id: userId,
    });

    return updatedDepartment;
  }

  static async delete(client, id, userId) {
    const oldData = await this.getById(client, id);
    if (!oldData) throw new Error('Department not found');

    const { rowCount } = await client.query(
      'UPDATE department SET deleted_at = current_timestamp WHERE id = $1 AND deleted_at IS NULL',
      [id]
    );
    if (rowCount === 0) throw new Error('Department not found');

    await ChangeHistory.logAction(client, {
      object_type: 'department',
      object_id: id,
      old_data: oldData,
      new_data: null,
      user_id: userId,
    });

    return rowCount > 0;
  }
}

module.exports = Department;
