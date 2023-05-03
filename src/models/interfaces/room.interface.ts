import { Schema, Document } from 'mongoose';
import IPrice from './price.interface';

export interface IRoom extends Document {
    name: string;
    roomNumber: number;
    venueId: number;
    pricePerChannel: Array<IPrice>
}

export default IRoom;
