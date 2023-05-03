import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import RoomService from '@/services/room.service';

class RoomController {
    private RoomService = new RoomService();

    /**
   * fetches the price per channel
   * @param req 
   * @param res 
   * @returns - a token or an error
   */
    public fetchChannelPrice = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> => {
        try {
            const { id, channelId } = req.params;
            const response = await this.RoomService.fetchRoomPriceByChannel(id, channelId);
            res.status(200).json({ response })
        } catch (error) {
            console.log(error)
            next(new HttpException(400, 'Cannot fetch price'))
        }
    }
}

export default RoomController;