const ChangeHistory = require('./change_history');

class Address {
  static async create(
    client,
    { region, locality, street, house, building, apartment, employee_id },
    userId
  ) {
    const { rows } = await client.query(
      'INSERT INTO address (region, locality, street, house, building, apartment, employee_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [region, locality, street, house, building, apartment, employee_id]
    );
    const newData = rows[0];

    await ChangeHistory.logAction(client, {
      object_type: 'address',
      object_id: newData.id,
      old_data: null,
      new_data: newData,
      user_id: userId,
    });

    return newData;
  }

  static async updateFull(
    client,
    employee_id,
    { region, locality, street, house, building, apartment },
    userId
  ) {
    const oldData = await this.getById(client, employee_id);

    const { rows } = await client.query(
      'UPDATE address SET region = $1, locality = $2, street = $3, house = $4, building = $5, apartment= $6, updated_at = current_timestamp WHERE employee_id = $7 RETURNING *',
      [region, locality, street, house, building, apartment, employee_id]
    );
    const newData = rows[0];

    if (JSON.stringify(oldData) !== JSON.stringify(newData)) {
      await ChangeHistory.logAction(client, {
        object_type: 'address',
        object_id: newData.id,
        old_data: oldData,
        new_data: newData,
        user_id: userId,
      });
    }

    return newData;
  }

  static async deleteFull(client, employee_id, userId) {
    const oldData = await this.getById(client, employee_id);

    await client.query('DELETE FROM address WHERE employee_id = $1', [employee_id]);

    if (oldData) {
      await ChangeHistory.logAction(client, {
        object_type: 'address',
        object_id: oldData.id,
        old_data: oldData,
        new_data: null,
        user_id: userId,
      });
    }

    return { message: 'Address deleted' };
  }


  static async getById(client, employee_id) {
    const { rows } = await client.query('SELECT * FROM address WHERE employee_id = $1', [
      employee_id,
    ]);
    return rows[0];
  }
}

module.exports = Address;
