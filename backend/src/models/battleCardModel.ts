import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IBattleCard extends Document {
    name: string;
    type: string;
    rarity: number;
    health: number;
    damage: number;
    speed: number;
    abilities: string[];
    imageUrl: string;
}

interface IBattleCardMethods {
    setHealth(this: IBattleCard, health: number): number;
    setDamage(this: IBattleCard, damage: number): number;
    setSpeed(this: IBattleCard, speed: number): number;
    setAbilities(this: IBattleCard, abilities: string[]): string[];
    setImageUrl(this: IBattleCard, imageUrl: string): string;
    dealDamage(this: IBattleCard, target: IBattleCard, damage: number): string;
}

type IBattleCardModel = Model<IBattleCard, {}, IBattleCardMethods>;

const battleCardSchema = new Schema<IBattleCard, IBattleCardModel>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    rarity: { type: Number, required: true },
    health: { type: Number, required: true },
    damage: { type: Number, required: true },
    speed: { type: Number, required: true },
    abilities: { type: [String], required: true },
    imageUrl: { type: String, required: true }
});

battleCardSchema.methods.setHealth = function (this: IBattleCard, health: number): number {
    this.health = health;
    return this.health;
};

battleCardSchema.methods.setDamage = function (this: IBattleCard, damage: number): number {
    this.damage = damage;
    return this.damage;
};

battleCardSchema.methods.setSpeed = function (this: IBattleCard, speed: number): number {
    this.speed = speed;
    return this.speed;
};

battleCardSchema.methods.setAbilities = function (this: IBattleCard, abilities: string[]): string[] {
    this.abilities = abilities;
    return this.abilities;
};

battleCardSchema.methods.setImageUrl = function (this: IBattleCard, imageUrl: string): string {
    this.imageUrl = imageUrl;
    return this.imageUrl;
};

battleCardSchema.methods.dealDamage = function (this: IBattleCard, target: IBattleCard, damage: number): string {
    target.health -= damage;
    if (target.health <= 0) {
        target.health = 0;
        return `${this.name} dealt ${damage} damage to ${target.name}. ${target.name} has been destroyed.`;
    }
    return `${this.name} dealt ${damage} damage to ${target.name}. ${target.name} has ${target.health} health remaining.`;
};

const BattleCard = mongoose.model<IBattleCard, IBattleCardModel>('BattleCard', battleCardSchema);

export default BattleCard;