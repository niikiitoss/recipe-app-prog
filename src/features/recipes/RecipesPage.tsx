import React, { useState, useEffect } from 'react';
import { Meal } from './types';
import { searchMeals, getRandomMeal } from './api';
import { RecipeCard } from './RecipeCard';
import { RecipeModal } from './RecipeModal';

export const RecipesPage = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);

    useEffect(() => {
        fetchRandomRecipe();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const data = await searchMeals(query);
            if (data.meals) {
                setRecipes(data.meals);
            } else {
                setRecipes([]);
                setError('Diemžēl neviena recepte netika atrasta. Pamēģini citu vārdu (piem., chicken, beef).');
            }
        } catch (err) {
            setError('Notika kļūda savienojumā ar API.');
        } finally {
            setLoading(false);
        }
    };
    const fetchRandomRecipe = async () => {
        setLoading(true);
        setError(null);
        setQuery('');
        try {
            const data = await getRandomMeal();
            if (data.meals) {
                setRecipes(data.meals);
            }
        } catch (err) {
            setError('Notika kļūda savienojumā ar API.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">🍽️ Recepšu Meklētājs</h1>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Meklēt ēdienu..."
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                    Meklēt
                </button>
                <button 
                    type="button"
                    onClick={fetchRandomRecipe}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                >
                    Pārsteidz mani!
                </button>
            </form>

            {loading && <p className="text-center text-lg text-gray-600">Ielādē gardākās receptes...</p>}
            {error && <p className="text-center text-lg text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard 
                            key={recipe.idMeal} 
                            recipe={recipe} 
                            onViewDetails={setSelectedRecipe}
                        />
                    ))}
                </div>
            )}

            {selectedRecipe && (
                <RecipeModal 
                    recipe={selectedRecipe} 
                    onClose={() => setSelectedRecipe(null)} 
                />
            )}
        </div>
    );
};