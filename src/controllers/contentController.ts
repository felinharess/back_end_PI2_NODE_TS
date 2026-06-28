import { Request, Response } from 'express';
import { Content } from '../models/Content';

type Params = { id: string };

export async function createContent(req: Request, res: Response) {
    try {
        const { user_id, title, text, url } = req.body;
        const content = await Content.create({ user_id, title, text, url });
        return res.status(201).json(content);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAllContents(_req: Request, res: Response) {
    try {
        const contents = await Content.findAll();
        return res.status(200).json(contents);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getContentById(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const content = await Content.findByPk(id);
        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }
        return res.status(200).json(content);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateContent(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const { title, text, url } = req.body;
        const content = await Content.findByPk(id);
        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }
        await content.update({ title, text, url });
        return res.status(200).json(content);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteContent(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const content = await Content.findByPk(id);
        if (!content) {
            return res.status(404).json({ error: 'Content not found' });
        }
        await content.destroy();
        return res.status(204).send();
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
