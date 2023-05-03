import Room from "@/models/room.model";

import { Types } from 'mongoose';

class RoomService {
    private room = Room;

    /**
     * fetches the price of the room based on the channel
     * @param roomId - 
     * @param channelId - 
     * @param password 
     * @returns- a json or an error 
     */
    public async fetchRoomPriceByChannel (roomId: string, channelId: string){
        try {
            const channel_id = parseInt(channelId)
            const room_id = new Types.ObjectId(roomId);
            return this.room.aggregate([
                {
                  '$match': {
                    '_id': room_id
                  }
                }, {
                  '$lookup': {
                    'from': 'venues', 
                    'localField': 'venueId', 
                    'foreignField': 'venueId', 
                    'as': 'venues'
                  }
                }, {
                  '$unwind': {
                    'path': '$venues'
                  }
                }, {
                  '$unwind': {
                    'path': '$venues.visibility'
                  }
                }, {
                  '$unwind': {
                    'path': '$pricePerChannel'
                  }
                }, {
                  '$match': {
                    'venues.visibility.channel': channel_id
                  }
                }, {
                  '$match': {
                    'pricePerChannel.channel': channel_id
                  }
                }, {
                  '$addFields': {
                    'pricePerChannel.visibility': '$venues.visibility.isVisible'
                  }
                },{
                    '$project': {
                     venues: 0,
                     "pricePerChannel._id": 0
                   }
                }
              ])
        } catch (error) {
            throw new Error('Unable to fetch room price');
        }
    }

    /**
     * 
     * @param roomId 
     * @returns a json or an error
     */
    public async fetchRoomById (roomId: string) : Promise<string | null> {
        return this.room.findById(roomId)
    }
}

export default RoomService;
