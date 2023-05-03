import { Schema, model } from 'mongoose';
import IVenue from '@/models/interfaces/venue.interface';

const VenueSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    venueId: {
        type: Number,
        required: true,
        index: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    visibility: [
        {
            _id: false,
            channel: { type: Number, ref: 'Channel' },
            isVisible: {
                type: Boolean,
                required: true
            }
        }
    ],
}, { timestamps: true }
)

export default model<IVenue>('Venue', VenueSchema);

