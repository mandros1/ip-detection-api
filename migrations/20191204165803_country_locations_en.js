const schemaName = 'public';
const tableName = 'countryLocations';

exports.up = function(knex) {
    return Promise.all([
        knex
          .schema
            .withSchema(schemaName)
            .createTable(tableName, function ( locationTable ) {
                locationTable.increments();
                locationTable.integer('geonameId').notNullable().unique();
                locationTable.string('localeCode', 5).notNullable();
                locationTable.string('continentCode', 5).notNullable();
                locationTable.string('continentName', 50).notNullable();
                locationTable.string('countryIsoCode', 10);
                locationTable.string('country_name', 50);
                locationTable.integer('isInEuropeanUnion').notNullable();
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
