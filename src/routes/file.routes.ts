import { Router } from 'express';
import fileController from '../controllers/file.controller';

const fileRouter = Router();

fileRouter.get('/:id', fileController.getFile);
fileRouter.post('/:id', fileController.postFile);
fileRouter.get('/download/:id', fileController.downloadFile);
fileRouter.post('/delete/:id', fileController.deleteFile);

export default fileRouter;
