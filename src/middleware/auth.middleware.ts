import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/helpers/auth.helper';
import UserModel from '@/models/user.model';
import IToken from '@/utils/interfaces/token.interface';
import * as responseHandler from '@/utils/exceptions/responseHandler';
import jwt from 'jsonwebtoken';

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(responseHandler.info(res, 'unauthorised', 400));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
        const payload: IToken | jwt.JsonWebTokenError = await verifyToken(
            accessToken
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(responseHandler.info(res, 'unauthorised', 400));
        }

        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();

        if (!user) {
            return next(responseHandler.info(res, 'unauthorised', 400));
        }

        req.user = user;

        return next();
    } catch (error) {
        return next(responseHandler.error(res, 'Error authenticating user'));
    }
}

export default authenticatedMiddleware;