import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import UserService from '@/services/user.service';

class UserController {
    private UserService = new UserService();

    /**
   * registers a customer
   * @param req 
   * @param res 
   * @returns - a token or an error
   */
    public register = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> => {
        try {
            const { name, email, password } = req.body;
            const token = await this.UserService.signUp(name, email, password );
            res.status(201).json({ token })
        } catch (error) {
            next(new HttpException(400, 'Cannot register user here'))
        }
    }

    /**
   * Signs in the customer
   * @param req 
   * @param res 
   * @returns - a token or an error
   */
    public login = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> => {
        try {
            const { email, password } = req.body;
            const token = await this.UserService.login(email, password);
            res.status(200).json({ token })
        } catch (error) {
            next(new HttpException(400, 'Cannot login user'))
        }
    }
}

export default UserController;