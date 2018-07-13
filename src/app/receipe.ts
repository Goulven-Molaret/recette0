import { Ingredient } from "./ingredient";

export class Receipe{
    id: number;
    name: string;
    difficulty: string;
    country: string;
    type: string;
    ingredients: Ingredient[];
    description: string;
}