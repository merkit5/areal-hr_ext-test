/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
    pgm.createTable('department', {
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
        organization_id: {
            type: 'integer',
            notNull: true,
            references: 'organization',
            onDelete: 'cascade'
        },
        parent_id: {
            type: 'integer',
            references: 'department',
            onDelete: 'set null'
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
            type: 'timestamp',
            default: null
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
    pgm.dropTable('department');
};
