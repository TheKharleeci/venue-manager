import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;

    comparePassword(password: string) : Promise<Error | boolean >
}

export default IUser;
