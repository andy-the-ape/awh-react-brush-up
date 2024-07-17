import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import battleCardsRoute from './routes/battleCardsRoute';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/battle-cards', battleCardsRoute);

const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-app';

const PORT: string | number = process.env.PORT || 5555;

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    } catch(error) {
        console.error(error);
    }
})();

app.get('/', (request: Request, response: Response) => {
    return response.status(234).send('Hello World');
});

app.get('/health', (request: Request, response: Response) => {
    return response.status(200).send('Server is running');
});

