
exports.seed = async function(knex) {
    console.log('Running location seed');
    await knex.raw('COPY public.country_locations(geoname_id, locale_code, continent_code, continent_name, country_iso_code, country_name, is_in_european_union) FROM \'E:\\Projects\\ip-detection-api\\assets\\csv-scripts\\GeoLite2-Country-Locations-en.csv\' DELIMITER \',\' CSV HEADER;');
    console.log('Location seed done');
    console.log('Running ipv4 seed');
    await knex.raw('COPY public.country_blocks_ipv4(network, geoname_id, registered_country_geoname_id, represented_country_geoname_id, is_anonymous_proxy, is_satellite_provider) FROM \'E:\\Projects\\ip-detection-api\\assets\\csv-scripts\\GeoLite2-Country-Blocks-IPv4.csv\' DELIMITER \',\' CSV HEADER;');
    console.log('Ipv4 seed done');
};
