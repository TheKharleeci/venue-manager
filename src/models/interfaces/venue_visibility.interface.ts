import { Schema, Document } from 'mongoose';

export interface IVenueVisibility extends Document {
    channel: number;
    isVisible: boolean;
}

export default IVenueVisibility;