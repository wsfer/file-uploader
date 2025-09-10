import { Router } from 'express';
import folderController from '../controllers/folder.controller';

const folderRouter = Router();

folderRouter.get('/', folderController.getUserRootFolder);
folderRouter.get('/:id', folderController.getFolder);
folderRouter.post('/:id', folderController.postFolder);
folderRouter.post('/rename/:id', folderController.renameFolder);
folderRouter.post('/delete/:id', folderController.deleteFolder);

export default folderRouter;
