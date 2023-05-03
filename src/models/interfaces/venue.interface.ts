import { Schema, Document } from 'mongoose';
import IVenueVisibility from './venue_visibility.interface';

export interface IVenue extends Document {
    name: string;
    venueId: number;
    location: string;
    description: string;
    visibility: Array<IVenueVisibility>
}

export default IVenue;
