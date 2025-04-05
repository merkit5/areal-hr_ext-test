/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
    pgm.createTable('change_history', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        date: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
            notNull: true
        },
        object_type: {
            type: 'varchar(255)',
            notNull: true
        },
        object_id: {
            type: 'integer',
            notNull: true
        },
        changes: {
            type: 'json',
            notNull: true
        },
        user_id: {
            type: 'integer',
            notNull: true,
            references: 'user',
            onDelete: 'set null'
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
    pgm.dropTable('change_history');
};
