import { Request, Response } from 'express';
import { User } from '../models/User';

type Params = { id: string };

export async function createUser(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        return res.status(201).json(user);
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAllUsers(_req: Request, res: Response) {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getUserById(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateUser(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update({ name, email, password });
        return res.status(200).json(user);
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteUser(req: Request<Params>, res: Response) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        return res.status(204).send();
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
