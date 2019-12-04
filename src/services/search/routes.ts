import { Request, Response } from "express";
import { getRequestIp } from '../../ip/ipManager';

export default [
    {
        path: "/hello",
        method: "get",
        handler: async (req: Request, res: Response) => {
            console.log('Something happened');
            res.send("Hello world!");
        }
    },
    {
        path: "/info",
        method: "get",
        handler: async (req: Request, res: Response) => {

            await getRequestIp(req, res);

            // const reqContentType = req.header('Content-Type');
            //
            // // Check if supported content-type format
            // if(reqContentType !== 'text/csv' && reqContentType !== 'application/json') {
            //    res.status(400).send('Content-Type header not supporting only json and csv')
            // } else {
            //
            //     res.set('Content-Type', reqContentType);
            //     const address = req.socket.address();
            //     // const ipvFamily = req.socket.address()['family'];
            //
            //
            //     const currentIp = req.headers['x-forwarded-for'] ||
            //         req.connection.remoteAddress ||
            //         req.socket.remoteAddress ||
            //         (req.connection ? req.connection.remoteAddress : null);
            //     // const ip = ipLib.address();
            //     console.log('Please work m');
            //
            //
            //
            //     reqContentType === 'text/csv' ?
            //         res.send(`ip, country\n${currentIp}, Croatia`) :
            //         res.send({
            //             "ip": currentIp,
            //             "country": "Croatia"
            //         });
            // }
        }
    }
];
