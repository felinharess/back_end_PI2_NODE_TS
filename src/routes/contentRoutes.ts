import { Router } from 'express';
import { createContent, getAllContents, getContentById, updateContent, deleteContent } from '../controllers/contentController';

const contentRoutes = Router();

contentRoutes.post('/', createContent);
contentRoutes.get('/', getAllContents);
contentRoutes.get('/:id', getContentById);
contentRoutes.put('/:id', updateContent);
contentRoutes.delete('/:id', deleteContent);

export default contentRoutes;
