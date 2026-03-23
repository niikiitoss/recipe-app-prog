
export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strMealThumb: string; 
    strInstructions: string;
    strYoutube: string;
    [key: string]: any; 
}

export interface MealResponse {
    meals: Meal[] | null; 
}
