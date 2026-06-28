import express, {json} from 'express';
import cors from 'cors'; 
import {database} from './Database/database';
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import analysisRoutes from './routes/analysisRoutes';
import authRoutes from './routes/authRoutes';

export default async function createApp() {
    const app = express();
    app.use(json());
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            const allowed = [
                'http://localhost:5173',
                'http://localhost:3000',
            ];
            const isLovable = origin.endsWith('.lovable.app');
            if (allowed.includes(origin) || isLovable) {
                return callback(null, true);
            }
            return callback(null, true);
        },
        credentials: true
    }));

    try{
        await database.authenticate();
        await database.sync({alter: true});
        console.log('Database connected succesfully');

    }catch(error){
        console.log("Error connecting to the database: ", error);
    }

    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/contents', contentRoutes);
    app.use('/analyses', analysisRoutes);

    return app;
}   