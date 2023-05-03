import { Router } from 'express';
import RoomController from '@/controller/room.controller';
import authenticatedMiddleware from '@/middleware/auth.middleware';

const router = Router();
const roomController = new RoomController();

router.get(
    '/price/:id/:channelId',
    authenticatedMiddleware,
    roomController.fetchChannelPrice
  );

export default router;
