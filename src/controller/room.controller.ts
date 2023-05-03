import { Request, Response, NextFunction } from 'express';
import * as responseHandler from '@/utils/exceptions/responseHandler';
import RoomService from '@/services/room.service';
import HttpException from '@/utils/exceptions/http.exception';

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
            next(new HttpException(500, 'unauthorised'));
            return responseHandler.error(res, 'Bad request', 400);
        }
    }
}

export default RoomController;