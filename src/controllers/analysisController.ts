import { Request, Response } from 'express';
import { Analysis } from '../models/Analysis';

type Params = { id: string };

export async function createAnalysis(req: Request, res: Response) {
    try {
        const { content_id, ai_percentage, fake_percentage, classification, confidence_level } = req.body;
        const analysis = await Analysis.create({ content_id, ai_percentage, fake_percentage, classification, confidence_level });
        return res.status(201).json(analysis);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAllAnalyses(_req: Request, res: Response) {
    try {
        const analyses = await Analysis.findAll();
        return res.status(200).json(analyses);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAnalysisById(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const analysis = await Analysis.findByPk(id);
        if (!analysis) {
            return res.status(404).json({ error: 'Analysis not found' });
        }
        return res.status(200).json(analysis);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateAnalysis(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const { ai_percentage, fake_percentage, classification, confidence_level } = req.body;
        const analysis = await Analysis.findByPk(id);
        if (!analysis) {
            return res.status(404).json({ error: 'Analysis not found' });
        }
        await analysis.update({ ai_percentage, fake_percentage, classification, confidence_level });
        return res.status(200).json(analysis);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteAnalysis(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const analysis = await Analysis.findByPk(id);
        if (!analysis) {
            return res.status(404).json({ error: 'Analysis not found' });
        }
        await analysis.destroy();
        return res.status(204).send();
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
