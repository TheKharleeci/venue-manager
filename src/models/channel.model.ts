import { Schema, model } from 'mongoose';
import IChannel from '@/models/interfaces/channel.interface';

const ChannelSchema = new Schema ({
    channelName: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    channelId: {
        type: Number,
        required: true,
        index: true,
    }
}, { timestamps: true }
)
export default model<IChannel>('Channel', ChannelSchema);