import { Request, Response, NextFunction } from 'express';
import { createConnection, redisClient } from './RedisConnection';

createConnection('ntsl', '127.0.0.1:6379');

export const redisMiddleware = async (req: Request | any, res: Response | any, next: NextFunction) => {
    
    const client = await redisClient('ntsl');

    // await client.connect();
    const key = "__cacheRedis__" + req.originalUrl || req.url;

    await client.connect();
    const reply: any = await client.get(key);
    if (!reply) {
        res.sendResponse = res.send;
        res.send = async (body:any) => {
            await client.set(key, JSON.stringify(body));
            res.sendResponse(body);
        }
        return next();    
    } 
    res.send(reply).end();
    await client.disconnect();
};
