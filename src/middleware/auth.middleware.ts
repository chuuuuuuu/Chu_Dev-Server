import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import IUserInfo from '../interface/IUserInfo';
import config from '../config';

const JwtHandler = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.auth as string;
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token, config.jwtSecret) as IUserInfo;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
        expiresIn: '1h'
    });
    res.setHeader('token', newToken);

    next();
};

export default JwtHandler;
