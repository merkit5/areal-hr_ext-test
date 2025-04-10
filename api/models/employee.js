const pool = require('../config/db');
const Passport = require("./passport");
const Address = require("./address");
const File = require("./file");
const ChangeHistory = require('./change_history');

class Employee {
    static async getAll(client) {
        const { rows } = await client.query('SELECT * FROM employee WHERE deleted_at IS NULL');
        return rows;
    }

    static async getByIdFull(client, id) {
        const { rows: employees } = await client.query('SELECT * FROM employee WHERE id = $1 AND deleted_at IS NULL', [id]);
        if (!employees.length) return null;

        const [employee] = employees;

        const { rows: passports } = await client.query('SELECT * FROM passport WHERE employee_id = $1', [id]);
        const { rows: addresses } = await client.query('SELECT * FROM address WHERE employee_id = $1 AND deleted_at IS NULL', [id]);
        const { rows: files } = await client.query('SELECT * FROM file WHERE employee_id = $1', [id]);

        return {
            ...employee,
            passport: passports[0] || null,
            address: addresses[0] || null,
            files
        };
    }

    static async createFull(client, { first_name, last_name, patronymic, birth_date, passport, address, files }, userId) {
        const { rows: [employee] } = await client.query(
            'INSERT INTO employee (first_name, last_name, patronymic, birth_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, patronymic, birth_date]
        );

        const employee_id = employee.id;

        await ChangeHistory.logAction(client, {
            action: 'create',
            object_type: 'employee',
            object_id: employee_id,
            old_data: null,
            new_data: employee,
            user_id: userId
        });

        if (passport) {
            await Passport.create(client, { ...passport, employee_id }, userId);
        }

        if (address) {
            await Address.create(client, { ...address, employee_id }, userId);
        }

        if (Array.isArray(files)) {
            for (const file of files) {
                await File.create(client, { ...file, employee_id }, userId);
            }
        }

        return await this.getByIdFull(client, employee_id);
    }

    static async updateFull(client, id, { first_name, last_name, patronymic, birth_date, passport, address, files }, userId) {
        const oldData = await this.getByIdFull(client, id);
        if (!oldData) throw new Error('Employee not found');

        await client.query(
            'UPDATE employee SET first_name = $1, last_name = $2, patronymic = $3, birth_date = $4, updated_at = current_timestamp WHERE id = $5',
            [first_name, last_name, patronymic, birth_date, id]
        );

        const newData = await this.getByIdFull(client, id);
        await ChangeHistory.logAction(client, {
            action: 'update',
            object_type: 'employee',
            object_id: id,
            old_data: oldData,
            new_data: newData,
            user_id: userId
        });

        if (passport) {
            await Passport.updateFull(client, id, passport, userId);
        }

        if (address) {
            await Address.updateFull(client, id, address, userId);
        }

        if (files) {
            for (const file of files) {
                await File.updateFull(client, id, { ...file }, userId);
            }
        }

        return newData;
    }

    static async deleteFull(client, id, userId) {
        const oldData = await this.getByIdFull(client, id);
        if (!oldData) throw new Error('Employee not found');

        await client.query('UPDATE employee SET deleted_at = current_timestamp WHERE id = $1', [id]);

        await ChangeHistory.logAction(client, {
            action: 'delete',
            object_type: 'employee',
            object_id: id,
            old_data: oldData,
            new_data: null,
            user_id: userId
        });

        await Address.deleteFull(client, id, userId);
        await Passport.deleteFull(client, id, userId);
        await File.deleteFull(client, id, userId);

        return { message: 'Employee deleted' };
    }
}

module.exports = Employee;
