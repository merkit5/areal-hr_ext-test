/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createType('operation_type', [
    'hire',
    'fire',
    'promote',
    'demote',
    'transfer'
  ]);

  pgm.createTable('hr_operations', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    operation_type: {
      type: 'operation_type',
      notNull: true,
    },
    salary: {
      type: 'decimal(8,2)',
    },
    date: {
      type: 'timestamp',
      notNull: true,
    },
    employee_id: {
      type: 'integer',
      notNull: true,
      references: 'employee',
      onDelete: 'cascade',
    },
    department_id: {
      type: 'integer',
      references: 'department',
      onDelete: 'set null',
    },
    position_id: {
      type: 'integer',
      references: 'position',
      onDelete: 'set null',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable('hr_operations');
  pgm.dropType('operation_type');
};
