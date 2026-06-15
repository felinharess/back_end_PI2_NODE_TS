import {Sequelize} from 'sequelize';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;

if(!databaseUrl) throw new Error ("DATABASE_URL was not defined in .env file");

export const database = new Sequelize(databaseUrl,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {require: true, rejectUnauthorized: false}
    }
});