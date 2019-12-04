import { Request, Response } from "express";

const ipLib = require('ip');
const Netmask = require('netmask').Netmask;
let block = null;

const getCountry = () => {
    block = new Netmask('network field goes here');
};

const contains = (netmask: String, ip: String) => {
    block = new Netmask(netmask);
    return block.contains(ip);
};


export const getRequestIp = (req: Request, res: Response) => {

    const reqContentType = req.header('Content-Type');

    const ipCountry = 'Croatia';

    //contains('188.252.128.0/17', '188.252.197.253')

    if(reqContentType !== 'text/csv' && reqContentType !== 'application/json') {
        res.status(400).send('Content-Type header not supporting only json and csv')
    } else {

        res.set('Content-Type', reqContentType);
        const address = req.socket.address();
        // const ipvFamily = req.socket.address()['family'];


        const currentIp = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection ? req.connection.remoteAddress : null);
        // const ip = ipLib.address();
        console.log(currentIp);
        // if(ipLib.isV4Format(currentIp)) console.log('IPV4 format');
        // if(ipLib.isV6Format(currentIp)) console.log('IPV6 format');



        reqContentType === 'text/csv' ?
            res.send(`ip, country\n${currentIp}, ${ipCountry}`) :
            res.send({
                "ip": currentIp,
                "country": "Croatia"
            });
    }
};


