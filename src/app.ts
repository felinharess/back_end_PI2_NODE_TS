import express, {json} from 'express';
import cors from 'cors'; 
import {database} from './Database/database';

export default async function createApp() {
    const app = express();
    app.use(json());
    app.use(cors());

    try{
        await database.authenticate();
        await database.sync({alter: true});
        console.log('Database connected succesfully');

    }catch(error){
        console.log("Error connecting to the database: ", error);
    }
    return app;
}   