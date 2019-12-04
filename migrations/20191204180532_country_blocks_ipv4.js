const schemaName = 'public';
const tableName = 'countryBlocksIPV4';

exports.up = function(knex) {
    return Promise.all([
        knex
            .schema
            .withSchema(schemaName)
            .createTable(tableName, function ( IPV4Table ) {
                IPV4Table.increments();
                IPV4Table.specificType('network', 'cidr').notNullable();
                IPV4Table.integer('geonameId');
                IPV4Table.integer('registeredCountryGeonameId').references('geonameId').inTable('countryLocations');
                IPV4Table.integer('representedCountryGeonameId').references('geonameId').inTable('countryLocations');
                IPV4Table.integer('isAnonymousProxy');
                IPV4Table.integer('isSatelliteProvider');
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
