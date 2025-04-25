/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.sql(`
    INSERT INTO organization (name, comment) VALUES
    ('Organization 1', 'Comment 1'),
    ('Organization 2', 'Comment 2');
  `);

  pgm.sql(`
    INSERT INTO department (name, comment, organization_id, parent_id) VALUES
    ('Department 1', 'Comment 1', 1, NULL),
    ('Department 2', 'Comment 2', 1, 1),
    ('Department 3', 'Comment 3', 2, NULL);
  `);

  pgm.sql(`
    INSERT INTO position (name) VALUES
    ('Position 1'),
    ('Position 2'),
    ('Position 3');
  `);

  pgm.sql(`
    INSERT INTO employee (first_name, last_name, patronymic, birth_date) VALUES
    ('John', 'John', 'Johnson', '01.02.1999'),
    ('Jane', 'Jane', 'Janeson', '02.03.1999');
  `);

  pgm.sql(`
    INSERT INTO passport (series, number, issue_date, issuer_code, issuer, employee_id) VALUES
    ('1234', '567890', '03.04.2012', '123-456', 'Issuer 1', 1),
    ('5678', '098765', '04.02.2016', '789-012', 'Issuer 2', 2);
  `);

  pgm.sql(`
    INSERT INTO address (region, locality, street, house, building, apartment, employee_id) VALUES
      ('Region 1', 'Locality 1', 'Street 1', '1', '1', '10', 1),
    ('Region 2', 'Locality 2', 'Street 2', '2', '2', '20', 2);
  `);

  pgm.sql(`
    INSERT INTO "user" (first_name, last_name, patronymic, login, password, role) VALUES
    ('Admin', 'User', 'Adminovich', 'admin', 'password1', 'admin'),
    ('HR', 'User', 'HR', 'user', 'password2', 'hr');
  `);

  pgm.sql(`
    INSERT INTO hr_operations (operation_type, salary, date, employee_id, department_id, position_id) VALUES
    ('Hire', 50000.00, '24.04.2025', 1, 1, 1),
    ('Promotion', 60000.00, '24.04.2025', 2, 2, 2);
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.sql(`
    DELETE FROM organization;
    DELETE FROM department;
    DELETE FROM position;
    DELETE FROM employee;
    DELETE FROM passport;
    DELETE FROM address;
    DELETE FROM "user";
    DELETE FROM hr_operations;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
