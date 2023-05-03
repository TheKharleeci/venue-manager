import { Document } from 'mongoose';

export interface IChannel extends Document {
    channelName: string;
    url: string;
    channelId: number;
}

export default IChannel;
