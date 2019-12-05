import { Request, Response } from "express";
import Knex from 'knex';
import {cofiguration} from '../knex';

const knex: Knex = Knex(cofiguration as Knex.Config);
const IsIp = require('is-ip');
const reqIp = require('request-ip');

let ipAddress;

export let myMap: Map<string, boolean>;


function add<K,V>(map:Map<K,V>, key:K, value:V){
    if(map.has(key)){
        throw new TypeError("Key "+ key +" already exists!");
    }else{
        map.set(key,value);
    }
}


// @ts-ignore
export const isBlacklisted = async (req: Request, res: Response, next) => {
    ipAddress = String(req.headers['x-forwarded-for']) || reqIp.getClientIp(req);
    if(myMap.has(ipAddress)) res.status(403).send('403 Forbidden');
    else next();
};


/**
 * Checks if the provided IP is inside the blacklist table
 *  true - client is forbidden to access the app and given back 403
 *  false - called next() and client is allowed in the application
 * @param req http request object
 * @param res http response object
 * @param next function skips the execution of this route, allowing client to proceed to the wanted route
 */
// @ts-ignore
export const getBlacklisted = async (req: Request, res: Response, next) => {
    // ipAddress = String(req.headers['x-forwarded-for']) || reqIp.getClientIp(req);
    await knex.raw(`SELECT network_ip FROM public.blacklist_users;`)
        .then( (blacklistData) => {
            myMap = new Map<string, boolean>();
            if(blacklistData.rowCount > 0){
                (blacklistData.rows).forEach((row: { network_ip: any; }) => {
                    add(myMap, row.network_ip, true);
                })
            }
        })
        .catch( err => {
            console.error(`Error has occurred: ${err}`);
            res.status(500).send(`Error has occurred while querying the blacklist data`);
        })
};


/**
 * Queries the name of the country found under the provided countryId
 * @param req http request object
 * @param res http response object
 * @param countryId is the geoname_id parameter found in either ipv4 or ipv6 table
 * @param reqContentType is the wanted Content-Type header (text/csv or application/json)
 * @param currentIp is the IP of the client request
 */
const countryOfOrigin = async (req: Request, res: Response, countryId: number, reqContentType: string, currentIp: string) => {
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
};


/**
 * Queries the geoname_id of the provided client IPv4 by seeing in which cidr range it can fit
 *  Calls countryOfOrigin on successful data
 * @param req http request object
 * @param res http response object
 * @param reqContentType is the wanted Content-Type header (text/csv or application/json)
 * @param currentIp is the IP of the client request
 */
const handleIPv4Address = async (req: Request, res: Response, currentIp: string, reqContentType: string) => {
    await knex.raw(`SELECT network, registered_country_geoname_id FROM public.country_blocks_ipv4 WHERE network >> ?;`, [String(currentIp)])
        .then( async (ipData) => {
            if(ipData.rowCount > 0){
                const countryId = ipData.rows[0].registered_country_geoname_id;
                await countryOfOrigin(req, res, countryId, reqContentType, currentIp);
            } else res.status(200).send(`There is no CIDR IP address in the database to which the provided ip (${currentIp}) belongs to.`);
        })
        .catch(err => {
            console.error(`Error has occurred: ${err}`);
            res.status(500).send(`Error has occurred while querying the network data`);
        });
};


/**
 * Queries the geoname_id of the provided client IPv6 by seeing in which cidr range it can fit
 *  Calls countryOfOrigin on successful data
 * @param req http request object
 * @param res http response object
 * @param reqContentType is the wanted Content-Type header (text/csv or application/json)
 * @param currentIp is the IP of the client request
 */
const handleIPv6Address = async (req: Request, res: Response, currentIp: string, reqContentType: string) => {
    await knex.raw(`SELECT network, registered_country_geoname_id FROM public.country_blocks_ipv6 WHERE network >> ?;`, [String(currentIp)])
        .then( async (ipv6Data) => {
            if(ipv6Data.rowCount > 0){
                const countryId = ipv6Data.rows[0].registered_country_geoname_id;
                await countryOfOrigin(req, res, countryId, reqContentType, currentIp);
            } else res.status(200).send(`There is no CIDR IP address in the database to which the provided ip (${currentIp}) belongs to.`);
        })
        .catch(err => {
            console.error(`Error has occurred: ${err}`);
            res.status(500).send(`Error has occurred while querying the network data`);
        });
};

/**
 * Gets the provided request header content-type, which in this version of code has to be 'text/csv' or 'application/json', and client IP address
 *  According to the version of IP address (IPv4 or IPv6) it calls appropriate method
 * @param req http request object
 * @param res http response object
 */
export const getRequestIp = async (req: Request, res: Response) => {

    const reqContentType = req.header('Content-Type');

    if(reqContentType === 'text/csv' || reqContentType === 'application/json') {

        ipAddress = String(req.headers['x-forwarded-for']) || reqIp.getClientIp(req);

        res.set('Content-Type', reqContentType);

        if(IsIp.v4(ipAddress)) {
            await handleIPv4Address(req, res, ipAddress, reqContentType);
        } else if(IsIp.v6(ipAddress)) {
            await handleIPv6Address(req, res, ipAddress, reqContentType);
        } else {
            res.status(500).send(`IP is neither in correct ipv4 nor ipv6 format, or is unreachable`);
        }
    }
    else res.status(400).send('Content-Type header supporting only application/json and text/csv')
};


