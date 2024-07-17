import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BattleCard, { IBattleCard } from './models/battleCardModel';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/battle-card', async (request: Request, response: Response) => {
    try {
        if (
            !request.body.name ||
            !request.body.type ||
            !request.body.rarity ||
            !request.body.health ||
            !request.body.damage ||
            !request.body.speed ||
            !request.body.abilities ||
            !request.body.imageUrl
        ) {
            return response.status(400).send({ message: "Missing required information." });
        }
        const newBattleCard = {
            name: request.body.name,
            type: request.body.type,
            rarity: request.body.rarity,
            health: request.body.health,
            damage: request.body.damage,
            speed: request.body.speed,
            abilities: request.body.abilities,
            imageUrl: request.body.imageUrl
        };

        const battleCard: IBattleCard = await BattleCard.create(newBattleCard);
        return response.status(201).send(battleCard);

    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "An error occurred, please try again later." });
    }
});

app.get('/battle-cards', async (request: Request, response: Response) => {
    try {
        const battleCards: IBattleCard[] = await BattleCard.find();
        return response.status(200).send(battleCards);
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "An error occurred, please try again later." });
    }
});