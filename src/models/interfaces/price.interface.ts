import { Document } from 'mongoose';

export interface IPrice extends Document {
    channel: number;
    hourlyPrice: number;
}

export default IPrice;