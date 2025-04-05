/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
    pgm.createTable('address', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        region: {
            type: 'varchar(255)',
            notNull: true
        },
        locality: {
            type: 'varchar(255)',
            notNull: true
        },
        street: {
            type: 'varchar(255)'
        },
        building: {
            type: 'varchar(10)'
        },
        apartment: {
            type: 'varchar(10)'
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
    pgm.dropTable('address');
};
