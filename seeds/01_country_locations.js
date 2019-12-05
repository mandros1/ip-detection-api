
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('public.country_locations').del()
    .then(async function () {
      // Inserts seed entries
        await knex.raw('COPY public.country_locations(geoname_id, locale_code, continent_code, continent_name, country_iso_code, country_name, is_in_european_union) FROM \'E:\\Projects\\ip-detection-api\\assets\\csv-scripts\\GeoLite2-Country-Locations-en.csv\' DELIMITER \',\' CSV HEADER;');
    });
};
