import express, { Request, Response, Router } from 'express';
import BattleCard, { IBattleCard } from '../models/battleCardModel';

const router: Router = express.Router();

// Create a new Battle Card and save it to the db
router.post('/', async (request: Request, response: Response) => {
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

// Get all Battle Cards from the db
router.get('/', async (request: Request, response: Response) => {
    try {
        const battleCards: IBattleCard[] = await BattleCard.find();
        return response.status(200).send({
            count: battleCards.length,
            data: battleCards
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "An error occurred, please try again later." });
    }
});

// Get a specific Battle Card by ID from the db
router.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const battleCard: IBattleCard | null = await BattleCard.findById(id);
        if (!battleCard) {
            return response.status(404).send({ message: "Battle Card not found." });
        }
        return response.status(200).send(battleCard);
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "An error occurred, please try again later." });
    }
});

// Update a specific Battle Card by ID
router.put('/:id', async (request: Request, response: Response) => {
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

        const { id } = request.params;

        const result: IBattleCard | null = await BattleCard.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: "Battle Card not found." });
        }
        return response.status(200).send({ message: "Battle Card updated successfully." });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "An error occurred, please try again later." });
    }
});

//Delete a specific Battle Card by ID
router.delete('/battle-cards/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const result: IBattleCard | null = await BattleCard.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: "Battle Card not found." });
        }
        return response.status(200).send({ message: "Battle Card deleted successfully." });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "An error occurred, please try again later." });
    }
});

export default router;