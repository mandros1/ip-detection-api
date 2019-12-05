
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('public.country_blocks_ipv6').del()
    .then(async function () {
      // Inserts seed entries
        console.log('Running ipv6 seed');
        await knex.raw('COPY public.country_blocks_ipv6(network, geoname_id, registered_country_geoname_id, represented_country_geoname_id, is_anonymous_proxy, is_satellite_provider) FROM \'E:\\Projects\\ip-detection-api\\assets\\csv-scripts\\GeoLite2-Country-Blocks-IPv6.csv\' DELIMITER \',\' CSV HEADER;');
        console.log('Ipv6 seed done');
    });
};
