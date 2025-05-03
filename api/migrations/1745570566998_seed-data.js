const argon2 = require('argon2');
require('dotenv').config({ path: '../.env' });

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void>}
 */
exports.up = async (pgm) => {

  await pgm.sql(`
    INSERT INTO organization (name, comment) VALUES
    ('Organization 1', 'Comment 1'),
    ('Organization 2', 'Comment 2');
  `);

  await pgm.sql(`
    INSERT INTO department (name, comment, organization_id, parent_id) VALUES
    ('Department 1', 'Comment 1', 1, NULL),
    ('Department 2', 'Comment 2', 1, 1),
    ('Department 3', 'Comment 3', 2, NULL);
  `);

  await pgm.sql(`
    INSERT INTO position (name) VALUES
    ('Position 1'),
    ('Position 2'),
    ('Position 3');
  `);

  await pgm.sql(`
    INSERT INTO employee (first_name, last_name, patronymic, birth_date) VALUES
    ('John', 'Doe', 'Johnson', '1999-02-01'),
    ('Jane', 'Smith', 'Janeson', '1999-03-02');
  `);

  await pgm.sql(`
    INSERT INTO passport (series, number, issue_date, issuer_code, issuer, employee_id) VALUES
    ('1234', '567890', '2012-04-03', '123-456', 'Issuer 1', 1),
    ('5678', '098765', '2016-02-04', '789-012', 'Issuer 2', 2);
  `);

  await pgm.sql(`
    INSERT INTO address (region, locality, street, house, building, apartment, employee_id) VALUES
    ('Region 1', 'Locality 1', 'Street 1', '1', '1', '10', 1),
    ('Region 2', 'Locality 2', 'Street 2', '2', '2', '20', 2);
  `);

  const adminLogin = process.env.ADMIN_LOGIN || 'admin';
  const managerLogin = process.env.MANAGER_LOGIN || 'manager';

  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const managerPassword = process.env.MANAGER_PASSWORD || 'manager123';

  const hashedAdminPassword = await argon2.hash(adminPassword);
  const hashedManagerPassword = await argon2.hash(managerPassword);


  await pgm.sql(`
    INSERT INTO "user" (first_name, last_name, patronymic, login, password, role) VALUES
    ('Admin', 'User', 'Adminovich', '${adminLogin}', '${hashedAdminPassword}', 'admin'),
    ('Manager', 'User', 'Managerovich', '${managerLogin}', '${hashedManagerPassword}', 'manager');
  `);

  await pgm.sql(`
    INSERT INTO hr_operations (operation_type, salary, date, employee_id, department_id, position_id) VALUES
    ('hire', 50000.00, '2025-04-24', 1, 1, 1),
    ('promote', 60000.00, '2025-04-24', 2, 2, 2);
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void>}
 */
exports.down = async (pgm) => {
  await pgm.sql(`DELETE FROM hr_operations;`);
  await pgm.sql(`DELETE FROM "user";`);
  await pgm.sql(`DELETE FROM address;`);
  await pgm.sql(`DELETE FROM passport;`);
  await pgm.sql(`DELETE FROM employee;`);
  await pgm.sql(`DELETE FROM position;`);
  await pgm.sql(`DELETE FROM department;`);
  await pgm.sql(`DELETE FROM organization;`);
};