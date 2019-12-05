const path = require('path');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('public.country_locations').del()
    .then(async function () {
        const csvPath = path.join(__dirname, '..', 'assets', 'csv-scripts', 'GeoLite2-Country-Locations-en.csv');
        console.log(csvPath);
        // const csvPath = __dirname + "/../assets/csv-script/";
      // Inserts seed entries
        await knex.raw(`COPY public.country_locations(geoname_id, locale_code, continent_code, continent_name, country_iso_code, country_name, is_in_european_union) FROM \'${csvPath}\' DELIMITER \',\' CSV HEADER;`);
    });
};
