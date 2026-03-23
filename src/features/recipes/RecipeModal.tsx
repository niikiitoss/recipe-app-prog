import React from 'react';
import { Meal } from './types';
interface RecipeModalProps {
    recipe: Meal;
    onClose: () => void;
}
export const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${ingredient} (${measure})`);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 font-bold text-2xl transition-colors"
                    title="Aizvērt"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold mb-4 pr-8 text-gray-800">{recipe.strMeal}</h2>
                <img 
                    src={recipe.strMealThumb} 
                    alt={recipe.strMeal} 
                    className="w-full h-72 object-cover rounded-lg mb-6 shadow-sm" 
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold mb-3 border-b pb-2 text-gray-800">Sastāvdaļas</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {ingredients.map((item, index) => (
                                <li key={index} className="text-gray-600">{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-3 border-b pb-2 text-gray-800">Pagatavošana</h3>
                        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                            {recipe.strInstructions}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};