class ChangeHistory {
  static async logAction(client, { object_type, object_id, old_data, new_data, user_id, ignoreFields = [] }) {
    const changes = {
      old: {},
      new: {}
    };

    if (new_data === null) {
      for (const key in old_data) {
        if (!ignoreFields.includes(key)) {
          changes.old[key] = old_data[key];
          changes.new[key] = null;
        }
      }
    }
    else if (old_data === null) {
      for (const key in new_data) {
        if (!ignoreFields.includes(key)) {
          changes.old[key] = null;
          changes.new[key] = new_data[key];
        }
      }
    }
    else {
      for (const key in new_data) {
        if (!ignoreFields.includes(key) && JSON.stringify(old_data[key]) !== JSON.stringify(new_data[key])) {
          changes.old[key] = old_data[key];
          changes.new[key] = new_data[key];
        }
      }
    }

    if (Object.keys(changes.old).length === 0 && Object.keys(changes.new).length === 0) {
      return null;
    }

    const { rows } = await client.query(
      `INSERT INTO change_history (date, object_type, object_id, changes, user_id)
       VALUES (NOW(), $1, $2, $3, $4)
           RETURNING *`,
      [object_type, object_id, changes, user_id]
    );

    return rows[0];
  }

  static async getByObject(client, object_type, object_id) {
    const { rows } = await client.query(
      'SELECT * FROM change_history WHERE object_type = $1 AND object_id = $2 ORDER BY date DESC',
      [object_type, object_id]
    );
    return rows;
  }

  static async getAll(client) {
    const { rows } = await client.query('SELECT * FROM change_history ORDER BY date DESC');
    return rows;
  }

  static async getUserData(client, userId) {
    const { rows } = await client.query('SELECT first_name, last_name, patronymic FROM "user" WHERE id = $1', [userId]);
    return rows[0];
  }
}

module.exports = ChangeHistory;
