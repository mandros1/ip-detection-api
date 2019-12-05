const path = require('path');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('public.country_blocks_ipv4').del()
    .then(async function () {
      // Inserts seed entries
        const csvPath = path.join(__dirname, '..', 'assets', 'csv-scripts', 'GeoLite2-Country-Blocks-IPv4.csv');
        console.log('Running ipv4 seed');
        await knex.raw(`COPY public.country_blocks_ipv4(network, geoname_id, registered_country_geoname_id, represented_country_geoname_id, is_anonymous_proxy, is_satellite_provider) FROM \'${csvPath}\' DELIMITER \',\' CSV HEADER;`);
        console.log('Ipv4 seed done');
    });
};
