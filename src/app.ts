import express, {json} from 'express';
import cors from 'cors'; 
import {database} from './Database/database';
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import analysisRoutes from './routes/analysisRoutes';

export default async function createApp() {
    const app = express();
    app.use(json());
    app.use(cors({
        origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
        credentials: true
    }));

    try{
        await database.authenticate();
        await database.sync({alter: true});
        console.log('Database connected succesfully');

    }catch(error){
        console.log("Error connecting to the database: ", error);
    }

    app.use('/users', userRoutes);
    app.use('/contents', contentRoutes);
    app.use('/analyses', analysisRoutes);

    return app;
}   