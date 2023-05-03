import { Request, Response, NextFunction } from 'express';
import UserService from '@/services/user.service';
import HttpException from '@/utils/exceptions/http.exception';

class UserMiddleware {

    private UserService = new UserService();

    /**
     * Verifies if a user exists on the database
     * @param email - Email of the new user
     * @returns- a next or an error 
     */
    public checkIfUserExists = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email } = req.body;
            const user = await this.UserService.getUserByEmail(email.toLowerCase());
            return user ? next(new HttpException(400, 'User already exists')) : next();
        } catch (error) {
            next(new HttpException(400, 'Cannot verify if user exists'))
        }
    }
}

export default UserMiddleware;
