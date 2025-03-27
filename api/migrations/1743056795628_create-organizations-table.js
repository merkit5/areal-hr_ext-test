/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
    pgm.createTable('organization', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        name: {
            type: 'varchar(255)',
            notNull: true
        },
        comment: {
            type: 'text'
        },
        created_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        },
        deleted_at: {
            type: 'timestamp'
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
    pgm.dropTable('organization');
};
