import { Request, Response } from "express";
import Knex from 'knex';
import {cofiguration} from '../knex';

const knex: Knex = Knex(cofiguration as Knex.Config);


/**
 *
 * @param req
 * @param res
 * @param next
 */
// @ts-ignore
export const isBlacklisted = async (req: Request, res: Response, next) => {
    const address = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection ? req.connection.remoteAddress : null);
    await knex.raw(`SELECT * FROM public.blacklist_users WHERE network_ip = ?;`, [String(address)])
        .then( (blacklistData) => {
            if(blacklistData.rowCount > 0){
                res.status(403).send('403 Forbidden');
            } else next();
        })
        .catch( err => {
            console.error(`Error has occurred: ${err}`);
            res.status(500).send(`Error has occurred while querying the blacklist data`);
        })
};

/**
 *
 * @param req
 * @param res
 */
export const getRequestIp = async (req: Request, res: Response) => {

    const reqContentType = req.header('Content-Type');

    if(reqContentType !== 'text/csv' && reqContentType !== 'application/json') {
        res.status(400).send('Content-Type header supporting only application/json and text/csv')
    } else {

        const currentIp = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection ? req.connection.remoteAddress : null);

        res.set('Content-Type', reqContentType);

        await knex.raw(`SELECT network, registered_country_geoname_id FROM public.country_blocks_ipv4 WHERE network >> ?;`, [String(currentIp)])
            .then( async (ipData) => {
                if(ipData.rowCount > 0){
                    const countryId = ipData.rows[0].registered_country_geoname_id;
                    await knex.raw(`SELECT country_name from public.country_locations WHERE geoname_id = ?;`, [countryId])
                        .then(countryData => {
                           if(countryData.rowCount > 0){
                               const countryName = countryData.rows[0].country_name;
                               reqContentType === 'text/csv' ?
                                   res.status(200).send(`ip, country\n${currentIp}, ${countryName}`) :
                                   res.status(200).send({
                                       "ip": currentIp,
                                       "country": countryName
                                   });
                           } else res.status(200).send(`There is no country in the database to which the provided ip (${currentIp}) belongs to.`);
                        })
                        .catch(err => {
                            console.error(`Error has occurred: ${err}`);
                            res.status(500).send(`Error has occurred while querying the location data`);
                        });
                } else res.status(200).send(`There is no CIDR IP address in the database to which the provided ip (${currentIp}) belongs to.`);
            })
            .catch(err => {
                console.error(`Error has occurred: ${err}`);
                res.status(500).send(`Error has occurred while querying the network data`);
            });
    }
};


