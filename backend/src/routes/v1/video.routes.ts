import express from 'express';
import { listVideosController, uploadVideoController, deleteVideoController } from '../../controller/video.controller';
import upload from '../../middlewares/multer.middleware';

const videoRouter = express.Router();

videoRouter.post('/upload', upload.single('video') , uploadVideoController);
videoRouter.get('/list', listVideosController);
videoRouter.delete('/:videoId', deleteVideoController);
export default videoRouter;