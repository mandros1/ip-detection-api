const path = require('path');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('public.country_blocks_ipv6').del()
    .then(async function () {
      // Inserts seed entries
        const csvPath = path.join(__dirname, '..', 'assets', 'csv-scripts', 'GeoLite2-Country-Blocks-IPv6.csv');
        console.log(csvPath);
        console.log('Running ipv6 seed');
        await knex.raw(`COPY public.country_blocks_ipv6(network, geoname_id, registered_country_geoname_id, represented_country_geoname_id, is_anonymous_proxy, is_satellite_provider) FROM \'${csvPath}\' DELIMITER \',\' CSV HEADER;`);
        console.log('Ipv6 seed done');
    });
};
