const schemaName = 'public';
const tableName = 'blacklistUsers';

exports.up = function(knex) {
    return Promise.all([
        knex
            .schema
            .withSchema(schemaName)
            .createTable(tableName, function ( blacklistUsersTable ) {
                blacklistUsersTable.increments();
                blacklistUsersTable.specificType('networkIp', 'inet').notNullable().unique();
                blacklistUsersTable.string('reason', 200);
                blacklistUsersTable.timestamp('dateAdded').notNullable();
            })
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex
            .schema
            .withSchema(schemaName)
            .dropTableIfExists( tableName )
    ]);
};
