import axios from 'axios';
import { MealResponse } from './types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMeals = async (query: string): Promise<MealResponse> => {
    const response = await axios.get<MealResponse>(`${BASE_URL}/search.php?s=${query}`);
    return response.data;
};

export const getRandomMeal = async (): Promise<MealResponse> => {
    const response = await axios.get<MealResponse>(`${BASE_URL}/random.php`);
    return response.data;
};