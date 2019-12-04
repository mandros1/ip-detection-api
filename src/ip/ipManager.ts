import { Request, Response } from "express";
import Knex from 'knex';
// import * as Knex from 'knex'
import {cofiguration} from '../../knex';

const instance: Knex = Knex(cofiguration as Knex.Config);


export const getRequestIp = async (req: Request, res: Response) => {

    const reqContentType = req.header('Content-Type');


    if(reqContentType !== 'text/csv' && reqContentType !== 'application/json') {
        res.status(400).send('Content-Type header not supporting only json and csv')
    } else {

        const currentIp = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection ? req.connection.remoteAddress : null);

        res.set('Content-Type', reqContentType);

        await instance.
            raw(`SELECT network, registered_country_geoname_id FROM public.country_blocks_ipv4 WHERE network >> '${currentIp}';`)
                .then(async (data) => {
                    if(data.rowCount >= 1){
                        const geonameId = data.rows[0].registered_country_geoname_id;
                        await instance.raw(`SELECT country_name from public.country_locations WHERE geoname_id = ${geonameId};`)
                            .then( countryData => {
                                if(countryData.rowCount >= 1){
                                    const countryName = countryData.rows[0].country_name;
                                    reqContentType === 'text/csv' ?
                                        res.send(`ip, country\n${currentIp}, ${countryName}`) :
                                        res.send({
                                            "ip": currentIp,
                                            "country": countryName
                                        });
                                }
                            }).catch(err => {
                                console.log(`Failed miserably with error: ${ err }`);
                                process.exit(1)
                            });
                    }
                })
                .catch(err => {
                    console.log(`Failed miserably with error: ${ err }`);
                    process.exit(1)
                });
    }
};


