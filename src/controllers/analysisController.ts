import { Request, Response } from 'express';
import { Analysis } from '../models/Analysis';
import { Content } from '../models/Content';

type Params = { id: string };

export async function createAnalysis(req: Request, res: Response) {
    try {
        const {
            user_id,
            title,
            text,
            url,
            ai_percentage,
            fake_percentage,
            classification,
            confidence_level
        } = req.body;

        const content = await Content.create({ user_id, title, text: text || null, url: url || null });

        const analysis = await Analysis.create({
            content_id: content.getDataValue('id'),
            ai_percentage,
            fake_percentage,
            classification,
            confidence_level
        });

        return res.status(201).json({
            id: analysis.getDataValue('id'),
            content_id: analysis.getDataValue('content_id'),
            ai_percentage: analysis.getDataValue('ai_percentage'),
            fake_percentage: analysis.getDataValue('fake_percentage'),
            classification: analysis.getDataValue('classification'),
            confidence_level: analysis.getDataValue('confidence_level'),
            createdAt: analysis.getDataValue('createdAt'),
            updatedAt: analysis.getDataValue('updatedAt'),
            content: {
                id: content.getDataValue('id'),
                user_id: content.getDataValue('user_id'),
                title: content.getDataValue('title'),
                text: content.getDataValue('text'),
                url: content.getDataValue('url')
            }
        });
    } catch (error) {
        console.error('Error creating analysis:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAllAnalyses(_req: Request, res: Response) {
    try {
        const analyses = await Analysis.findAll({ include: [{ model: Content, as: 'Content' }] });
        return res.status(200).json(analyses);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAnalysisById(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const analysis = await Analysis.findByPk(id, { include: [{ model: Content, as: 'Content' }] });
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
