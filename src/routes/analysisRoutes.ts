import { Router } from 'express';
import { createAnalysis, getAllAnalyses, getAnalysisById, updateAnalysis, deleteAnalysis } from '../controllers/analysisController';

const analysisRoutes = Router();

analysisRoutes.post('/', createAnalysis);
analysisRoutes.get('/', getAllAnalyses);
analysisRoutes.get('/:id', getAnalysisById);
analysisRoutes.put('/:id', updateAnalysis);
analysisRoutes.delete('/:id', deleteAnalysis);

export default analysisRoutes;
