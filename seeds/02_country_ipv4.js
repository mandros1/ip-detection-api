
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('public.country_blocks_ipv4').del()
    .then(async function () {
      // Inserts seed entries
        console.log('Running ipv4 seed');
        await knex.raw('COPY public.country_blocks_ipv4(network, geoname_id, registered_country_geoname_id, represented_country_geoname_id, is_anonymous_proxy, is_satellite_provider) FROM \'E:\\Projects\\ip-detection-api\\assets\\csv-scripts\\GeoLite2-Country-Blocks-IPv4.csv\' DELIMITER \',\' CSV HEADER;');
        console.log('Ipv4 seed done');
    });
};
