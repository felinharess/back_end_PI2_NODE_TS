import { Request, Response } from 'express';
import { User } from '../models/User';

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({
            where: { email, password },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json(user);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
