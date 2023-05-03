import { Schema, model } from 'mongoose';
import IRoom from '@/models/interfaces/room.interface';

const RoomSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: Number,
    },
    venueId: { type: Number, ref: 'Venue' },
    pricePerChannel: [
        {
            channel: { type: Number, ref: 'Channel', field: 'channelId' },
            hourlyPrice: {
                type: Number,
                required: true
            }
        }
      ],
}, { timestamps: true }
)

export default model<IRoom>('Room', RoomSchema);