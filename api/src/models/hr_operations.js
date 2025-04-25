const pool = require('../config/db');
const ChangeHistory = require('./change_history');

class HROperations {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM hr_operations');
    return rows;
  }

  static async create(
    client,
    { operation_type, salary, date, employee_id, department_id, position_id },
    userId = 1
  ) {
    const { rows } = await client.query(
      'INSERT INTO hr_operations (operation_type, salary, date, employee_id, department_id, position_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [operation_type, salary, date, employee_id, department_id, position_id]
    );
    const newData = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'hr_operations',
      object_id: newData.id,
      old_data: null,
      new_data: newData,
      user_id: userId,
    });

    return newData;
  }

  static async update(
    client,
    id,
    { operation_type, salary, date, employee_id, department_id, position_id },
    userId = 1
  ) {
    const oldData = await this.getById(client, id);
    const { rows } = await client.query(
      `UPDATE hr_operations SET operation_type = $1, salary = $2, date = $3, employee_id = $4, department_id = $5, position_id = $6, updated_at = current_timestamp WHERE id = $7 RETURNING *`,
      [operation_type, salary, date, employee_id, department_id, position_id, id]
    );
    const newData = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'hr_operations',
      object_id: id,
      old_data: oldData,
      new_data: newData,
      user_id: userId,
    });

    return newData;
  }

  static async delete(client, id, userId = 1) {
    const oldData = await this.getById(client, id);
    await client.query('DELETE FROM hr_operations WHERE id = $1', [id]);

    await ChangeHistory.logAction(client, {
      object_type: 'hr_operations',
      object_id: id,
      old_data: oldData,
      new_data: null,
      user_id: userId,
    });

    return { message: 'HR Operation deleted' };
  }

  static async getById(client, id) {
    const { rows } = await client.query('SELECT * FROM hr_operations WHERE id = $1', [id]);
    return rows[0];
  }
}

module.exports = HROperations;
