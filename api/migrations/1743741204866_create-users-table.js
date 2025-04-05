/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
    pgm.createTable('user', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        first_name: {
            type: 'varchar(255)',
            notNull: true
        },
        last_name: {
            type: 'varchar(255)',
            notNull: true
        },
        patronymic: {
            type: 'varchar(255)'
        },
        login: {
            type: 'varchar(255)',
            unique: true,
            notNull: true
        },
        password: {
            type: 'varchar(255)',
            notNull: true
        },
        role: {
            type: 'varchar(255)',
            notNull: true
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
    pgm.dropTable('user');
};
