/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
    pgm.createTable('passport', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        series: {
            type: 'varchar(4)',
            notNull: true
        },
        number: {
            type: 'varchar(6)',
            notNull: true
        },
        issue_date: {
            type: 'date',
            notNull: true
        },
        issuer_code: {
            type: 'varchar(7)',
            notNull: true
        },
        issuer: {
            type: 'varchar(255)',
            notNull: true
        },
        employee_id: {
            type: 'integer',
            notNull: true,
            references: 'employee',
            onDelete: 'cascade'
        },
        created_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
    pgm.dropTable('passport');
};
