import jwt from 'jsonwebtoken';
import IUser from '@/models/interfaces/user.interface';
import IToken from '@/utils/interfaces/token.interface';

export const createToken = (user: IUser): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '10h'
    })
}

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | IToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
            if (err) return reject(err);
            resolve(payload as IToken)
        })
    })
}

export default { createToken, verifyToken };