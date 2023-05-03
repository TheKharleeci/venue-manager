import { Router } from 'express';
import RoomController from '@/controller/room.controller';

const router = Router();
const roomController = new RoomController();

router.get(
    '/price/:id/:channelId',
    roomController.fetchChannelPrice
  );

export default router;
