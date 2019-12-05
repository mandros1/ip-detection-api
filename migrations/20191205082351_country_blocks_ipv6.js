const schemaName = 'public';
const tableName = 'countryBlocksIPV6';

exports.up = function(knex) {
    return Promise.all([
        knex
            .schema
            .withSchema(schemaName)
            .createTable(tableName, function ( IPV6Table ) {
                IPV6Table.increments();
                IPV6Table.specificType('network', 'cidr').notNullable();
                IPV6Table.integer('geonameId');
                IPV6Table.integer('registeredCountryGeonameId').references('geonameId').inTable('countryLocations').onDelete('cascade');
                IPV6Table.integer('representedCountryGeonameId').references('geonameId').inTable('countryLocations').onDelete('cascade');;
                IPV6Table.integer('isAnonymousProxy');
                IPV6Table.integer('isSatelliteProvider');
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
