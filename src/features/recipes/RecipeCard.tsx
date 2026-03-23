import React from 'react';
import { Meal } from './types';
interface RecipeCardProps {
    recipe: Meal;
    onViewDetails: (recipe: Meal) => void;
}
export const RecipeCard = ({ recipe, onViewDetails }: RecipeCardProps) => {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col">
            <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                className="w-full h-48 object-cover" 
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1 text-gray-800">{recipe.strMeal}</h3>
                <p className="text-sm text-gray-500 mb-4">Kategorija: {recipe.strCategory}</p>
                
                <div className="mt-auto flex flex-col gap-2">
                    <button 
                        onClick={() => onViewDetails(recipe)}
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-600 transition-colors text-center"
                    >
                        Skatīt recepti
                    </button>

                    {recipe.strYoutube ? (
                        <a 
                            href={recipe.strYoutube} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-600 transition-colors text-center"
                        >
                            Skatīties YouTube
                        </a>
                    ) : (
                        <span className="text-sm text-gray-400 text-center py-2">Video nav pieejams</span>
                    )}
                </div>
            </div>
        </div>
    );
};